import {Router} from "express";
import LoginController from "../../../controllers/login/login.controller";

const loginRouter = Router({caseSensitive: true});
const controller: LoginController = new LoginController();

loginRouter.post("/", controller.login);

export default loginRouter;
