import {Request, Response, NextFunction} from "express";
import {User} from "../mongoDB/models/user.model";
import {sendError, ERRORS} from "central_error_handler";

const emailCheckingMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {email} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        sendError(ERRORS.AUTH_INVALID.code, res, ERRORS.AUTH_INVALID);
        return;
    }

    next();
}

export default emailCheckingMiddleware;
