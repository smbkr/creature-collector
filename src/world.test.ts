import { Collector } from "./collector";
import { Creature, Family, Species } from "./creature";
import { collect } from "./world";

describe("world", () => {
  describe("collect", () => {
    it("adds a random nearby creature to the collector's collection", () => {
      const collector: Collector = {
        position: { x: 10, y: 10 },
        creatures: [],
      };

      const nearbyCreatures = [
        new Creature({
          family: Family.Amphibian,
          species: Species.Bird,
          hp: 1,
          cp: 1,
          position: { x: 9, y: 11 },
        }),
        new Creature({
          family: Family.Amphibian,
          species: Species.Bird,
          hp: 1,
          cp: 1,
          position: { x: 10, y: 13 },
        }),
      ];

      const farAwayCreatures = [
        new Creature({
          family: Family.Climber,
          species: Species.Bird,
          hp: 1,
          cp: 1,
          position: { x: 26, y: 111 },
        }),
        new Creature({
          family: Family.Climber,
          species: Species.Bird,
          hp: 1,
          cp: 1,
          position: { x: 23, y: 42 },
        }),
      ];

      const result = collect(
        [...nearbyCreatures, ...farAwayCreatures],
        collector
      );

      expect(result.creatures.length).toEqual(1);
      expect(nearbyCreatures.includes(result.creatures[0])).toBeTruthy();
    });
  });
});
