import { Creature } from "./creature";
import { Position } from "./location";

export interface Collector {
  position: Position;
  creatures: Creature[];
}
