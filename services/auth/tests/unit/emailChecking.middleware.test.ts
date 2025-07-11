import emailCheckingMiddleware from "../../src/middlewares/emailChecking.middleware";
import {Request, Response, NextFunction} from "express";
import {IUser, User} from "../../src/mongoDB/models/user.model";

describe("email checking middleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;
    let user: IUser;

    beforeEach(() => {
        req = {body: {email: ""}};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn()
    });

    test("should call next if the email has been existed in the DB", async () => {
        req.body.email = "admin@gmail.com"; // An existed email in the DB

        await emailCheckingMiddleware(req as Request, res as Response, next as NextFunction);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
});
