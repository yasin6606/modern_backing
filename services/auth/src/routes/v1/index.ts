import {Router} from "express";
import signupRouter from "./signup/signup.route";
import loginRouter from "./login/login.route";

const v1Route: Router = Router({caseSensitive: true});

v1Route.use("/signup", signupRouter);
v1Route.use("/login", loginRouter);

export default v1Route;
