import { Collector } from "./collector";
import { Creature } from "./creature";
import { isNearby } from "./location";

export interface World {
  creatures: Creature[];
  collectors: Collector[];
}

export function creaturesNearCollector(
  world: World,
  collector: Collector
): Creature[] {
  return world.creatures.filter((creature) =>
    isNearby(creature.position, collector.position)
  );
}
