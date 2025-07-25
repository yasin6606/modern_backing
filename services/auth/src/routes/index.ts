import {Router} from "express";
import v1Route from "../routes/v1";

const apiRoute: Router = Router({caseSensitive: true});

apiRoute.use("/v1", v1Route);

export default apiRoute;
