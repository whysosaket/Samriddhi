import { Router, Response } from "express";

import { chatbot, get_schemes } from "../controllers/flaskController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/flask/chatbot").post((req: any, res: Response)=>chatbot(req, res));
    router.route("/api/flask/get_schemes").post(fetchuser, (req: any, res: Response)=>get_schemes(req, res));
} 