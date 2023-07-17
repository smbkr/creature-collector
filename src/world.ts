import { Collector } from "./collector";
import { Creature } from "./creature";
import { isNearby } from "./location";

export function collect(
  creatures: Creature[],
  collector: Collector
): Collector {
  const nearbyCreatures = creatures.filter((creature) =>
    isNearby(creature.position, collector.position)
  );

  if (nearbyCreatures.length > 0) {
    collector.creatures.push(
      nearbyCreatures.sort(() => Math.random() - 0.5)[0]
    );
  }
  return collector;
}
