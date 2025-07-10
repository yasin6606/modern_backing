import {Request, Response, NextFunction} from "express";
import {User} from "../mongoDB/models/user.model";
import {Unauthorized} from "http-errors";

const emailCheckingMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {email} = req.body;

    const user = await User.findOne({email}).select("+password");

    if (!user) {
        const {status, message, name} = new Unauthorized("User does not exist!");
        res.status(status).json({message, name});
        return;
    }

    req.body = {...req.body, user};
    next();
}

export default emailCheckingMiddleware;
