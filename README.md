# Pouch Creatures

This repo contains some demo code for a totally fictional creature collecting game called Pouch Creatures, which definitely bears absolutely no resemblance to any real game whatsoever.

## Notes on each step of this project

### 1 - Define some domain classes to model this application.

For this step, I've modelled the world, collectors and creatures, mostly as interfaces or as an enum in the case of the creature family.

Reading ahead, and based on my (totally imagined) knowledge of a Gameboy game (that has nothing to do with this exercise), it's tempting to add a relationship between a collector and creature at this stage, or some logic to determine the distance between entities, etc. However, being strict about what the step actually asks for and applying YAGNI, I've decided not to jump ahead at this stage. Let's add complexity as and when it's required!

At this stage, since there's no logic, I've not yet added any tests.

### 2 - Gotta collect ‘em all!

To implement the first part, determining if a creature is nearby, I added a function to `world.ts` which takes an instance of `World` and a `Collector` and returns any creature within 8 units. This distance was completely arbitrary. It's implemented in a functional way, which is sufficient for this simple demo (and easy to test), but in a real game you'd _probably_ want to use an object where `creaturesNearCollector` is a method, as game worlds and entities are inherently stateful.

In a real game, I imagine the world would exist on a 2d grid, divided into cells, with some max bound, and the catchability distance would be some number smaller than the total size of the world. Another arbitrary decision, but I decided the positions can only be positive integers - the bottom left corner of the map would always be `0, 0`, no matter how large the world map grows.

I put the function to deremine which creatures are near the collector into the world module, as it feels like this is where it belongs, as the world "owns" the creatures and collectors. The code to detemine if a creature is within range lives in `location.ts`. This is probably not strictly necessary as it's only a few lines, but for the purposes of the demo I've moved it there to demonstrate separation of concerns.
