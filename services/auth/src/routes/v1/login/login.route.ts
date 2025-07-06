import {Router} from "express";
import LoginController from "../../../controllers/login/login.controller";
import usernameCheckingMiddleware from "../../../middlewares/usernameChecking.middleware";

const loginRouter = Router({caseSensitive: true});
const controller: LoginController = new LoginController();

loginRouter.post("/", usernameCheckingMiddleware, controller.token);

export default loginRouter;
