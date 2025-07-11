import WebServer from "./server";

// Entrypoint
const server: WebServer = new WebServer();
server.connect().then();
