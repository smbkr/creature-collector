import { battle } from "./battle";
import { Creature, Family, Species } from "./creature";

describe("battle", () => {
  it("returns the winning creature", () => {
    const strongCreature: Creature = {
      position: { x: 0, y: 0 },
      family: Family.Flyer,
      species: Species.Bird,
      hp: 100,
      cp: 25,
    };

    const weakCreature: Creature = {
      position: { x: 0, y: 0 },
      family: Family.Flyer,
      species: Species.Bird,
      hp: 100,
      cp: 10,
    };

    const result = battle(strongCreature, weakCreature);

    expect(result).toEqual(strongCreature);
  });

  describe("when one creature is super-effective against the other", () => {
    it("does more damage", () => {
      // Flyer is super-effective vs. runner
      const runner: Creature = {
        position: { x: 0, y: 0 },
        family: Family.Runner,
        species: Species.Bird,
        hp: 100,
        cp: 10,
      };

      const flyer: Creature = {
        position: { x: 0, y: 0 },
        family: Family.Flyer,
        species: Species.Bird,
        hp: 80,
        cp: 10,
      };

      const result = battle(runner, flyer);

      expect(result).toEqual(flyer);
    });
  });
});
