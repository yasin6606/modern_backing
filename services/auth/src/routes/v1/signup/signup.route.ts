import {Router} from "express";
import SignupController from "../../../controllers/signup/signup.controller";

const signupRouter = Router({caseSensitive: true});
const controller: SignupController = new SignupController();

signupRouter.post("/", controller.register);

export default signupRouter;
