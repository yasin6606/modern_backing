import emailCheckingMiddleware from "../../src/middlewares/emailChecking.middleware";
import {Request, Response, NextFunction} from "express";
import {User} from "../../src/mongoDB/models/user.model";

describe("email checking middleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;
    let fakeUser: object;

    beforeEach(() => {
        req = {body: {email: ""}};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        (User.findOne as jest.Mock) = jest.fn();

        jest.clearAllMocks();
    });

    test("should call next if the email has been existed in the DB", async () => {
        fakeUser = {email: "admin@example.com"};

        let selectMock = jest.fn().mockResolvedValue(fakeUser);
        (User.findOne as jest.Mock).mockReturnValue({select: selectMock});

        const email: string = "admin@example.com";
        req.body.email = email; // An existed email in the DB

        await emailCheckingMiddleware(req as Request, res as Response, next as NextFunction);

        expect(User.findOne).toHaveBeenCalledWith({email});
        expect(req.body.user).toEqual(fakeUser);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    test("should return 404 if email is not existed", async () => {
        const selectMock = jest.fn().mockResolvedValue(null);
        (User.findOne as jest.Mock).mockReturnValue({select: selectMock});

        const email: string = "wrong@example.com";
        req.body.email = email; // A wrong email

        await emailCheckingMiddleware(req as Request, res as Response, next as NextFunction);

        expect(User.findOne).toHaveBeenCalledWith({email});
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.anything(),
            name: expect.anything()
        }));
    });
});
