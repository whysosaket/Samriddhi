import { Router, Response } from "express";

import  { createLoan, approveLoan, getLoans, getInterest, getFundLoans } from "../controllers/loanController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/loan/create").post(fetchuser, (req: any, res: Response) => createLoan(req, res));
    router.route("/api/loan/approve").post(fetchuser, (req: any, res: Response) => approveLoan(req, res));
    router.route("/api/loan/get").get(fetchuser, (req: any, res: Response) => getLoans(req, res));
    router.route("/api/loan/getfund").post(fetchuser, (req: any, res: Response) => getFundLoans(req, res));
    router.route("/api/loan/interest").post((req: any, res: Response) => getInterest(req, res));
} 