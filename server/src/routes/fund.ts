import { Router, Response } from "express";

import {createFund, joinFund} from "../controllers/fundController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/fund/create").post(fetchuser, (req: any, res: Response) => createFund(req, res));
    router.route("/api/fund/join").post(fetchuser, (req: any, res: Response) => joinFund(req, res));
} 