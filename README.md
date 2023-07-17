# Pouch Creatures

This repo contains some demo code for a totally fictional creature collecting game called Pouch Creatures, which definitely bears absolutely no resemblance to any real game whatsoever.

## Set-up and running the tests

If using [asdf](https://github.com/asdf-vm/asdf), run `asdf install` to install the runtime versions. Then run `yarn` to install the project dependencies.

If you're not using `asdf`, I highly recommend it.

Otherwise, install Node and Yarn as specified in `.tool-versions`, and then install the `yarn` dependencies.

Once the dependencies are installed, you can run the tests with `yarn test`.

## Notes on each step of this project

### 1 - Define some domain classes to model this application.

For this step, I've modelled the world, collectors and creatures, mostly as interfaces or as an enum in the case of the creature family.

Reading ahead, and based on my (totally imagined) knowledge of a Gameboy game (that has nothing to do with this exercise), it's tempting to add a relationship between a collector and creature at this stage, or some logic to determine the distance between entities, etc. However, being strict about what the step actually asks for and applying YAGNI, I've decided not to jump ahead at this stage. Let's add complexity as and when it's required!

At this stage, since there's no logic, I've not yet added any tests.

### 2 - Gotta collect ‘em all!

To implement collection, I've extended my `Collector` model to have a list of `creatures` that the collector owns.

I added a function `collect` to `world.ts`, which first filters the list of creatures in the world (passed as the first argument) to find those which are near the player, defined as within 8 units. This is based on the arbitrary decision that the game world is a 2d grid, with x/y coordinates which can only be positive integers.

Secondly, it shuffles the list of creatures which are nearby, and then picks the first creature and adds it to the collection.

I did some refactoring, removing the `World` interface as it wasn't really necessary to achieve any of this, and I'm sticking with the YAGNI principle while working on this.

The code to determine if a creature is near the player lives in `location.ts`, which may be a bit overkill/gold-plating for such a simple use case, but serves as an example of encapsulation for the purposes of the test.

### 3 - Multi-player

There are probably multiple technical and product decisions we could make to address the questions posed here, but let's answer things in the order they're asked:

> #### Scenario:
>
> 1. I’m sat at my computer and I see a Creature I want to catch. I try to catch it.
> 2. At the exact same time, my neighbour sees the same Creature and also tries to catch it.
> 3. My neighbour succeeds and adds the Creature to his collection before I’ve finished catching
>    it.
> 4. I am unable to catch the Creature because it has already been caught.
> 5. I now feel sad.

> How can we avoid this situation? Does your program handle this elegantly? If not, how can you change it to allow a Creature to be caught by multiple people? What are the ramifications of allowing that?

The first question raised here is what exactly we mean by "avoid this situation"?Do we want to avoid the player feeling sad? Or do we want to prevent the player getting into a situation where they might initiate a catch that is not guaranteed to succeed?

If we want to address the former, there are some product-led decisions we could make to prevent sadness in the player, the most immediately obvious of which is to allow multiple players to catch the same creature.

This would mean the backend implementation of the catching mechanism would need to operate on the principle of a blueprint or description of a creature, rather than taking a reference to a specific instance of a creature - that way, players A and B can both catch e.g. a level 3 electric mouse, rather than creature with ID 1234. A successful catch would lead to a new instance of said creature being created, and linked to the catching player.

The pros of this approach would be that players never feel sad because they could not catch a creature, however this approach has significant downsides. Firstly, it would devalue the in-game economy by essentially removing any element of scarcity, which makes collecting completely pointless. If we read into the "avoid the player feeling sad" goal a bit more, and interpret this as more along the lines of "keep players engaged and returning to the game", devaluing the economy is going to have a very negative effect on this measure. With this approach we're not really seeing the wood for the trees.

If we are instead to assume that a failed catch is acceptable within the rules of the game, our goal instead is probably something more like "ensure the game handles a failed catch in a non-erroneous way", such as showing the player an encouraging message so they can try again.

If our system was a relatively simple monolithic backend with a direct database connection, one possible implementation would be to use a form of locking or mutual exclusion to handle contention.

Using a pessimistic lock, when the first player initiates a catch, the record relating to the creature is locked, preventing further processes from reading it. Assuming there are some game rules that mean a catch may or may not succeed, the record would either be updated to indicate the new ownership if the catch succeeds, then unlocked, or simply unlocked if the catch fails. Any subsequent catch attempts would either see the lock and spin (re-try, checking to see if the lock has been released and then loading the record), or immediately return some known error code to the client if spinning is not desired.

Downsides to this solution include:

- Traffic congestion if there are a large number of connections spinning the lock waiting for it to be freed
- The "fail fast" approach could lead to large traffic spikes as players re-try the catch repeatedly
- If there is an unhandled failure, the backend process is restarted, there is a network outage, etc the lock may remain held while the initiating process has ended - this could be mitigated with a TTL on the lock
- If the catch fails for the first player due to the game rules, and the lock is freed without an update to the record, then the lock may be acquired by whichever _process_ is scheduled next, which may or may not correspond with the next player to have initiated a catch in the game client. This may or may not be the desired behaviour of the system.

An opportunistic lock would behave somewhat differently. For each process belonging to a player who intiated a catch, the system would:

- Read the creature record, including e.g. an `updated_at` timestamp, or hash/checksum
- Make whatever modifications are needed, e.g. associate player 123 with creature 789
- If the hash or `updated_at` values are unchanged, write the updated record (and update the hash or timestamp)
- If the record has changed, abort and send an error code to the client to handle gracefully.

The above would likely be handled in a transaction using the database's own methods for atomicity and consistency.

Downsides to this method:

- If there are a large number of users, our system is doing a lot of work reading records, preparing chagesets, and attempting writes for a lot of processes, the majority of which will fail. This could lead to slow response times and user frustration, and increased compute costs
- We have the same problem where the order is not guaranteed to correspond with the order in which players initiated a catch.

If our system architecture differs and we're using a more distributed architecture, we could maybe think of using a FIFO (first in, first out) queue to handle the catching mechanism.

The flow of data would look something like:

- Player initiates a catch in the client
- Client makes a request to externally facing API with collector ID and creature ID
- The backend then validates this request, and if valid pushes the payload onto a FIFO queue
- Client then begins to poll the API to obtain the outcome of the attempted catch
- A queue processor picks up the message, runs whatever game-rule logic determines if a catch succeeds or not, then updates the record
- Any subsequent messages for the creature are failed/discarded
- The client displays a success/failure message depending on the outcome

Downsides to this method:

- A large number of players would mean a lot of messages queued and processed, the majority of which may fail - FIFO queues tend to be expensive!
- The client has to poll (or subscribe on a socket etc) which is more expensive on the client-side
- Latency in the queue, due to a large number of requests, or a network outage etc could lead to user frustration
- Complexity and lots of "moving parts" mean debugging is harder - we'd want to think about trace IDs etc for messages to help debug

### 4 - Be the very best!

For this step, I added a new module `battle.ts` to house the logic for a battle.

The implementation uses a public `battle` function, which randomly chooses who gets first turn, then uses a recursive function `battleTurn`, which subtracts the attacker's CP from the defender's HP, then calls itself with the attacker/defender reversed until teh defender has 0 (or less) HP.

I considered adding a test for the random first move, but it felt a little bit too close to "don't test what you don't own". If a test is desired for this, one could use a jest mock to stub the `Math.random()` function to return some fixed value and assert it was called, but this is a bit of an implementation leak - we should be free to change the implementation without breaking our tests. You could also test that creature A always wins, for example, and fix the output of `Math.random()` again, but this is prone to false-positives.

I've encapsulated the super-effectiveness logic in a method on the `Creature`, which I refactored from a simple interface to a class, so that it can house this logic. This is maybe overkill for a codebase this small, but it serves as an example for the purposes of the test.

The special case of the amphibian has been added to the super-effectiveness table along with all the other family pairings, which is acceptable with such a small set of families, however in a "real world" scenario where there could be many more families with no upper bound, you may want a special case method to handle this instead, so the list doesn't grow to an unmanagable size.
