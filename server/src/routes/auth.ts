import { Router, Response } from "express";

import { createUser, loginUser, getUserInfo } from "../controllers/authController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/auth/login").post((req: any, res: Response)=>loginUser(req, res));
    router.route("/api/auth/signup").post((req: any, res: Response)=>createUser(req, res));
    router.route("/api/auth/getuser").get(fetchuser, (req: any, res: Response)=>getUserInfo(req, res));
} 