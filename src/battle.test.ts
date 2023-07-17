import { battle } from "./battle";
import { Creature, Family, Species } from "./creature";

describe("battle", () => {
  it("returns the winning creature", () => {
    const strongCreature = new Creature({
      position: { x: 0, y: 0 },
      family: Family.Flyer,
      species: Species.Bird,
      hp: 100,
      cp: 25,
    });

    const weakCreature = new Creature({
      position: { x: 0, y: 0 },
      family: Family.Flyer,
      species: Species.Bird,
      hp: 100,
      cp: 10,
    });

    const winner = battle(strongCreature, weakCreature);

    expect(winner).toEqual(strongCreature);
  });

  describe("when one creature is super-effective against the other", () => {
    const testCases: [Family, Family][] = [
      [Family.Flyer, Family.Runner],
      [Family.Flyer, Family.Swimmer],
      [Family.Runner, Family.Swimmer],
      [Family.Climber, Family.Flyer],
      [Family.Amphibian, Family.Climber],
      [Family.Amphibian, Family.Runner],
      [Family.Amphibian, Family.Flyer],
      [Family.Amphibian, Family.Swimmer],
    ];

    it.each(testCases)("%s should beat %s", (strongFamily, weakFamily) => {
      // Creature from strong family has worse base stats
      const strongCreature = new Creature({
        position: { x: 0, y: 0 },
        family: strongFamily,
        species: Species.Bird,
        hp: 80,
        cp: 10,
      });

      const weakCreature = new Creature({
        position: { x: 0, y: 0 },
        family: weakFamily,
        species: Species.Bird,
        hp: 100,
        cp: 10,
      });

      const winner = battle(strongCreature, weakCreature);

      expect(winner).toEqual(strongCreature);
    });
  });
});
