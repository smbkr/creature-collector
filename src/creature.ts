import { Position } from "./location";

export enum Species {
  Bird,
  Butterfly,
  Shark,
  Turtle,
  Lion,
  Zebra,
  Goat,
  Monkey,
}

export enum Family {
  Flyer,
  Swimmer,
  Runner,
  Climber,
  Amphibian,
}

// Map of attacker -> families it is super effective against
const SUPER_EFFECTIVE_MAP: Partial<Record<Family, Family[]>> = {
  [Family.Flyer]: [Family.Runner, Family.Swimmer],
  [Family.Swimmer]: [Family.Climber],
  [Family.Runner]: [Family.Swimmer],
  [Family.Climber]: [Family.Flyer],
  [Family.Amphibian]: [
    Family.Flyer,
    Family.Swimmer,
    Family.Runner,
    Family.Climber,
  ],
};

export class Creature {
  position: Position;
  family: Family;
  species: Species;
  hp: number;
  cp: number;

  constructor({
    family,
    species,
    hp,
    cp,
    position,
  }: {
    family: Family;
    species: Species;
    hp: number;
    cp: number;
    position: Position;
  }) {
    this.family = family;
    this.species = species;
    this.hp = hp;
    this.cp = cp;
    this.position = position;
  }

  public isSuperEffectiveAgainst(family: Family): boolean {
    return SUPER_EFFECTIVE_MAP[this.family]?.includes(family) || false;
  }
}
