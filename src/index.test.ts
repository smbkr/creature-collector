import { hello } from ".";

describe("index", () => {
  it("greets the given name", () => {
    expect(hello("world")).toEqual("Hello, world!");
  });
});
