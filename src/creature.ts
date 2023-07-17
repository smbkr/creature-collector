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
}

export interface Creature {
  position: Position;
  family: Family;
  species: Species;
  hp: number;
  cp: number;
}
