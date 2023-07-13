import { Collector } from "./collector";
import { Creature } from "./creature";

export interface Position {
  x: number;
  y: number;
}

export interface World {
  creatures: Creature[];
  collectors: Collector[];
}
