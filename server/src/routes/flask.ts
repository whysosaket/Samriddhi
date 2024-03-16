import { Router, Response } from "express";

import { chatbot, getSchemes } from "../controllers/flaskController";

export default (router: Router) => {
    router.route("/api/flask/chatbot").post((req: any, res: Response)=>chatbot(req, res));
    router.route("/api/flask/getSchemes").post((req: any, res: Response)=>getSchemes(req, res));
} 