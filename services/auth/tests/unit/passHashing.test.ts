import passHashing from "../../src/utils/passHashing";

describe("hash a password", () => {
    const password = "123123123";

    test("hash a password", async () => {
        const hashed: string = await passHashing(password);

        expect<string>(typeof hashed).toBe("string");
    });

    test("each hash should be different of others", async () => {
        const hashed1: string = await passHashing(password);
        const hashed2: string = await passHashing(password);

        expect<string>(hashed1).not.toEqual<string>(hashed2);
    });
});
