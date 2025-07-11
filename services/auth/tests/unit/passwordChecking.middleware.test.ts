import passwordCheckingMiddleware from "../../src/middlewares/passwordChecking.middleware";
import {Request, Response, NextFunction} from "express";
import {User} from "../../src/mongoDB/models/user.model";
import passHashing from "../../src/utils/passHashing";

describe("password checking middleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(async () => {
        req = {body: {password: "", user: {}}};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        next = jest.fn();

        const hashed: string = await passHashing("123123123");

        req.body.user = new User({email: "test@example.com", password: hashed});
    });

    test("should call next if password is valid", async () => {
        req.body.password = "123123123"; // The correct incoming password

        await passwordCheckingMiddleware(req as Request, res as Response, next as NextFunction);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    test("return 401 if the password is wrong", async () => {
        req.body.password = "123456789"; // A wrong incoming password

        await passwordCheckingMiddleware(req as Request, res as Response, next as NextFunction);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.anything(),
            name: expect.anything()
        }));
        expect(next).not.toHaveBeenCalled();
    });
});
