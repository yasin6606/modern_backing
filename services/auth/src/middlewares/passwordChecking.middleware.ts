import {Request, Response, NextFunction} from "express";
import {Unauthorized} from "http-errors";
import {compare} from "bcryptjs";

const passwordCheckingMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {password, user} = req.body;

    const comp_res: boolean = await compare(password, user.password);

    if (!comp_res) {
        const {status, message, name} = new Unauthorized("Login failed!");
        res.status(status).json({message, name});
        return;
    }

    req.body = {...req.body.user.toObject(), password: null, __v: null};
    next();
}

export default passwordCheckingMiddleware;
