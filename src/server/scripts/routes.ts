import EXPRESS, { NextFunction, Request, Response } from "express";

const router = EXPRESS.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.sendFile("./index.html", { root: "./dist/client" });
});

router.get("/pong", (req: Request, res: Response, next: NextFunction) => {
	res.sendFile("./pong.html", { root: "./dist/client" });
});

router.get("/*", (req: Request, res: Response, next: NextFunction) => {
	res.sendFile("./not_found.html", { root: "./dist/client" });
});

export default router;
