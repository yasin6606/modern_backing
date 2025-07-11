import {Router} from "express";
import LoginController from "../../../controllers/login/login.controller";
import usernameCheckingMiddleware from "../../../middlewares/emailChecking.middleware";
import passwordCheckingMiddleware from "../../../middlewares/passwordChecking.middleware";

const loginRouter = Router({caseSensitive: true});
const controller: LoginController = new LoginController();

loginRouter.post("/", usernameCheckingMiddleware, passwordCheckingMiddleware, controller.token);

export default loginRouter;
