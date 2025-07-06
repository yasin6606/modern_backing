import {Request, Response, NextFunction} from "express";
// import errorsList from "../errorHandling/errorsList";

const usernameCheckingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const {username} = req.body;

    const len: number = username.length;

    if (len < 3) {
        // return res.status(errorsList).send("length error");
        res.status(403).send("length error");
        return;
    }

    next();
}

export default usernameCheckingMiddleware;
