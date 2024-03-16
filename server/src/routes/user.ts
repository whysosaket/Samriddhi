import { Router, Response } from "express";

import { depositFund, withdrawFund, pay, getTransactions } from "../controllers/userController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/user/deposit").post(fetchuser, (req: any, res: Response) => depositFund(req, res));
    router.route("/api/user/withdraw").post(fetchuser, (req: any, res: Response) => withdrawFund(req, res));
    router.route("/api/user/pay").post((req: any, res: Response) => pay(req, res));
    router.route("/api/user/transactions").get(fetchuser, (req: any, res: Response) => getTransactions(req, res));
} 