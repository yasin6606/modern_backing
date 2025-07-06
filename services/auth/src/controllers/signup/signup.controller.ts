import {Request, Response, NextFunction} from "express";

class SignupController {
    public register = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        res.send("signup");
    }
}

export default SignupController;
