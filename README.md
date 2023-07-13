# Pouch Creatures

This repo contains some demo code for a totally fictional creature collecting game called Pouch Creatures, which definitely bears absolutely no resemblance to any real game whatsoever.

## Notes on each step of this project

### 1 - Define some domain classes to model this application.

For this step, I've modelled the world, collectors and creatures, mostly as interfaces or as an enum in the case of the creature family.

Reading ahead, and based on my (totally imagined) knowledge of a Gameboy game (that has nothing to do with this exercise), it's tempting to add a relationship between a collector and creature at this stage, or some logic to determine the distance between entities, etc. However, being strict about what the step actually asks for and applying YAGNI, I've decided not to jump ahead at this stage. Let's add complexity as and when it's required!

At this stage, since there's no logic, I've not yet added any tests.
