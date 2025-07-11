import request from "supertest";
import MongoDBConnection from "../../src/mongoDB/MongoDBConnection";
import {Mongoose} from "mongoose";
import {User} from "../../src/mongoDB/models/user.model";
import Server from "../../src/server";

describe("Post /auth/v1/signup", () => {
    let db: Mongoose | null;
    let server: Server;
    const fakeUser = {
        username: 'yasin1',
        email: 'yasin1@example.com',
        password: 'secret123',
        gender: 'male',
        age: 30
    };

    beforeAll(async () => {
        const connDB = await MongoDBConnection.getInstance();
        db = connDB.mongooseInstance;

        server = new Server();
    });

    afterAll(async () => {
        await User.deleteOne({email: fakeUser.email});
        await db?.connection.close(true);
    });

    test("should create a new user and return 200", async () => {
        const res = await request(server.app).post("/auth/v1/signup").set("Accept", "application/json").send(fakeUser);

        expect(res.status).toBe(200);
    });

    test("trying to create a duplicate user faces 401", async () => {
        const res = await request(server.app).post("/auth/v1/signup").set("Accept", "application/json").send(fakeUser);

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("name");
    });
});
