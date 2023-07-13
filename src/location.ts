export interface Position {
  x: number;
  y: number;
}

const NEARBY_THRESHOLD = 8;

export function isNearby(a: Position, b: Position): boolean {
  return a.x - b.x <= NEARBY_THRESHOLD && a.y - b.y <= NEARBY_THRESHOLD;
}
