import {Request, Response, NextFunction} from "express";
import {sign, Algorithm, SignOptions} from "jsonwebtoken";
import {InternalServerError} from "http-errors";
import {StringValue} from "../../types/StringValue";

class LoginController {
    private JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;
    private JWT_ALGORITHM: Algorithm = (process.env.JWT_ALGORITHM as Algorithm) || "HS512";

    private signOpt: SignOptions = {
        algorithm: this.JWT_ALGORITHM,
        issuer: "Auth service",
        subject: "authentication user",
        expiresIn: (process.env.JWT_EXPIRES_IN as StringValue) || "15m"
    };

    private signFunc = (payload: object): string => {
        if (!this.JWT_SECRET_KEY) throw Error();
        return sign(payload, this.JWT_SECRET_KEY, this.signOpt);
    }

    public token = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = this.signFunc(req.body)

            res.status(200).send(token);
        } catch (e) {
            const {status, message, name} = new InternalServerError("Login succeeded, but failed to create token!");
            res.status(status).json({message, name});
        }
    }
}

export default LoginController;
