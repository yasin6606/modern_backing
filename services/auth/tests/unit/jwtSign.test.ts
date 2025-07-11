import jwtSign from "../../src/utils/jwtSign";

describe("Test the JWT Sign which should return a different token through each call", () => {
    const payload1 = {name: "Yasin", age: 29};
    const payload2 = {name: "Dariush", age: 63};

    test("return a token (String) from jwtSign", () => {
        const token = jwtSign(payload1);

        expect(typeof token).toBe("string");
    });

    test("should return a different string on each call", () => {
        const token1 = jwtSign(payload1);
        const token2 = jwtSign(payload1);

        const token3 = jwtSign(payload2);

        expect<string>(token1).toEqual<string>(token2);
        expect<string>(token1).not.toEqual<string>(token3);
    });
});
