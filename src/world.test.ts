import { Collector } from "./collector";
import { Creature, Family, Species } from "./creature";
import { World, creaturesNearCollector } from "./world";

describe("world", () => {
  describe("creaturesNearCollector", () => {
    it("returns creatures within 8 units of the collector", () => {
      const collector: Collector = {
        position: { x: 8, y: -5 },
      };

      const creatureNear: Creature = {
        position: { x: 4, y: 2 },
        species: Species.Bird,
        family: Family.Flyer,
      };

      const creatureFar: Creature = {
        position: { x: 12, y: 37 },
        species: Species.Butterfly,
        family: Family.Flyer,
      };

      const world: World = {
        collectors: [collector],
        creatures: [creatureNear, creatureFar],
      };

      const result = creaturesNearCollector(world, collector);
      expect(result).toContainEqual(creatureNear);
      expect(result).not.toContainEqual(creatureFar);
    });
  });
});
