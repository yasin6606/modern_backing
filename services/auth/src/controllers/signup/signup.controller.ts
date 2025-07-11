import {Request, Response, NextFunction} from "express";
import {IUser, User} from "../../mongoDB/models/user.model";
import {Unauthorized} from "http-errors";

class SignupController {
    public register = async (req: Request, res: Response, next: NextFunction) => {
        const {username, email, password, gender, age}: IUser = req.body;

        try {
            const user: IUser = new User({username, email, password, gender, age});
            await user.save();

            res.status(200).send("User is successfully created.");
        } catch (e) {
            const {status, message, name} = new Unauthorized("creating new user has faced an error!");
            res.status(status).json({message, name});
        }
    }
}

export default SignupController;
