import { Router, Response } from "express";

import {createFund, joinFund, getMyFunds, getFundQR, getFundInfo } from "../controllers/fundController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/fund/create").post(fetchuser, (req: any, res: Response) => createFund(req, res));
    router.route("/api/fund/join").post(fetchuser, (req: any, res: Response) => joinFund(req, res));
    router.route("/api/fund/myfunds").get(fetchuser, (req: any, res: Response) => getMyFunds(req, res));
    router.route("/api/fund/getqr").post(fetchuser, (req: any, res: Response) => getFundQR(req, res));
    router.route("/api/fund/getinfo").post(fetchuser, (req: any, res: Response) => getFundInfo(req, res));
} 