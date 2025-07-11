import express, {Application, Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routesSource from "./routes/index";
import RabbitMQConnection from "./rabbitmq/RabbitMQConnection";
import MongoDBConnection from "./mongoDB/MongoDBConnection";
import "dotenv/config.js"

class WebServer {
    public readonly app: Application;

    public constructor() {
        this.app = express();
        this.middlewares();
        this.setRoutes();
    }

    public connect = async (): Promise<void> => {
        this.serverListening();
        await this.setRabbit();
        await this.setMongo();
    }

    private middlewares = () => {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
    }

    private serverListening = (): void => {
        this.app.listen(process.env.AUTH_SERVICE_PORT || 5000, () => {
            console.log(`✅ Server is running on Port: ${process.env.AUTH_SERVICE_PORT}`);
        });
    }

    private setRoutes = () => {
        this.app.use("/auth", routesSource);

        // Garbage routes
        this.app.use(/.*/, (req: Request, res: Response) => {
            console.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
            res.status(404).json({
                status: 404,
                message: "Route not found",
                method: req.method,
                path: req.originalUrl,
            });
        });
    }

    private setMongo = async () => {
        await MongoDBConnection.getInstance();
    }

    private setRabbit = async () => {
        await RabbitMQConnection.getInstance();
    }
}

export default WebServer;
