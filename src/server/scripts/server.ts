import EXPRESS, { Application } from "express";
import HTTP from "http";

import CONFIG from "./config";
import router from "./routes";
import { setupWebpackMiddleware } from "./webpack_middleware";
import game from "./game";

const app: Application = EXPRESS();

setupWebpackMiddleware(app);

app.set("views", "./dist/client");
app.use(EXPRESS.static("./dist/client"));
app.get("/*", router);
const server = HTTP.createServer(app);

game(server);

server.listen(CONFIG.PORT, () =>
	console.info(
		`${new Date().toLocaleTimeString(undefined, {
			hour12: false,
		})} > Server running at http://localhost:${CONFIG.PORT}`
	)
);
