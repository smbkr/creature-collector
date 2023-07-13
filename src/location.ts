export interface Position {
  x: number;
  y: number;
}

const NEARBY_THRESHOLD = 8;

export function isNearby(a: Position, b: Position): boolean {
  return (
    Math.abs(a.x - b.x) <= NEARBY_THRESHOLD &&
    Math.abs(a.y - b.y) <= NEARBY_THRESHOLD
  );
}
