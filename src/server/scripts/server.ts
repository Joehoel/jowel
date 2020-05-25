import EXPRESS, { Application } from "express";
import HTTP from "http";

import CONFIG from "./config";
import router from "./routes";
import { setupWebpackMiddleware } from "./webpack_middleware";

const app: Application = EXPRESS();

setupWebpackMiddleware(app);

app.set("view engine", "ejs");
app.set("views", "./dist/client");
app.use(EXPRESS.static("./dist/client"));
app.get("/*", router);
const server = HTTP.createServer(app);

server.listen(CONFIG.PORT, () =>
	console.info(
		`${new Date().toLocaleTimeString(undefined, {
			hour12: false,
		})} > Server started on port ${CONFIG.PORT}`
	)
);
