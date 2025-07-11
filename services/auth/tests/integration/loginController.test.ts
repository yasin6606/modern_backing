import request from "supertest";
import MongoDBConnection from "../../src/mongoDB/MongoDBConnection";
import Server from "../../src/server";
import {Mongoose} from "mongoose";
import {User} from "../../src/mongoDB/models/user.model";

describe("Login Controller", () => {
    let db: Mongoose | null;
    let server: Server;
    const fakeUser = {
        username: 'yasin',
        email: 'yasin@example.com',
        password: 'secret123',
        gender: 'male',
        age: 30
    }

    beforeAll(async () => {
        const connDB = await MongoDBConnection.getInstance();
        db = connDB.mongooseInstance;

        server = new Server();
    });

    beforeEach(async () => {
        await User.create(fakeUser);
    });

    afterAll(async () => {
        await User.deleteOne({email: fakeUser.email});
        await db?.connection.close(true);
    });

    test("Should return a token with 200", async () => {
        const res = await request(server.app).post("/auth/v1/login").set("Accept", "application/json").send({
            email: fakeUser.email,
            password: fakeUser.password
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
});
