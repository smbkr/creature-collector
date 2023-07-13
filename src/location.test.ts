import { Position, isNearby } from "./location";

describe("location", () => {
  describe("isNearby", () => {
    it("returns true when a and b are in the same position", () => {
      const position: Position = {
        x: 2,
        y: -2,
      };

      const a = { ...position };
      const b = { ...position };

      expect(isNearby(a, b)).toEqual(true);
    });

    it("returns true when a is within 8 cells of b in the x dimension", () => {
      const a: Position = { x: 0, y: 0 };
      const b: Position = { x: 8, y: 0 };

      expect(isNearby(a, b)).toEqual(true);
    });

    it("returns true when a is within 8 cells of b in the y dimension", () => {
      const a: Position = { x: 0, y: 0 };
      const b: Position = { x: 0, y: 8 };

      expect(isNearby(a, b)).toEqual(true);
    });

    it("returns true when a is within 8 cells of b in both dimensions", () => {
      const a: Position = { x: 0, y: 0 };
      const b: Position = { x: 8, y: 8 };

      expect(isNearby(a, b)).toEqual(true);
    });

    it("returns false when a is greater than 8 cells of b in the x dimension", () => {
      const a: Position = { x: 0, y: 0 };
      const b: Position = { x: 9, y: 0 };

      expect(isNearby(a, b)).toEqual(false);
    });

    it("returns false when a is greater than 8 cells of b in the y dimension", () => {
      const a: Position = { x: 0, y: 0 };
      const b: Position = { x: 0, y: 9 };

      expect(isNearby(a, b)).toEqual(false);
    });

    it("returns false when a is greater than 8 cells of b in both dimensions", () => {
      const a: Position = { x: 0, y: 0 };
      const b: Position = { x: 9, y: 9 };

      expect(isNearby(a, b)).toEqual(false);
    });
  });
});
