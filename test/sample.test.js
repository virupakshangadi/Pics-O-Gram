import { add } from "../src/utils/sample.js";

test('add 3+4 to be 7', () => {
    expect(add(3, 4)).toBe(7);
});