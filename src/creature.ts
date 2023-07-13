import { Position } from "./world";

enum Species {
  Bird,
  Butterfly,
  Shark,
  Turtle,
  Lion,
  Zebra,
  Goat,
  Monkey,
}

enum Family {
  Flyer,
  Swimmer,
  Runner,
  Climber,
}

export interface Creature {
  position: Position;
  family: Family;
  species: Species;
}
