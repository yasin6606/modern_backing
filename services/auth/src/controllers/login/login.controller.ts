import {Request, Response, NextFunction} from "express";
import {InternalServerError} from "http-errors";
import signFunc from "../../utils/jwtSign";

class LoginController {
    public token = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = signFunc(req.body)

            res.status(200).json({token});
        } catch (e) {
            const {status, message, name} = new InternalServerError("Login succeeded, but failed to create token!");
            res.status(status).json({message, name});
        }
    }
}

export default LoginController;
