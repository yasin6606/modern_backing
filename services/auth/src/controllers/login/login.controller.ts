import {Request, Response, NextFunction} from "express";

class LoginController {
    public token = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        res.send("login");
    }
}

export default LoginController;
