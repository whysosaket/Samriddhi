import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";
import Fund from "../models/Fund";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

import {
  isEmailValid,
  toTitleCase,
  generateRandomString,
} from "../utils/UserHelper";

import CustomRequest from "../types/CustomRequest";

const JWT_SECRET = process.env.JWT_SECRET as string;

const createFund = async (req: CustomRequest, res: Response) => {
  let { name, generalInterest } = req.body;
  let success = false;
  let user = req.user;
  try {
    // check if user is valid
    if (!user) {
      return res.status(401).json({ success, error: "Unauthorized" });
    }
    let myuser = await User.findById(user.id);
    if (!myuser) {
      return res.status(401).json({ success, error: "Unauthorized" });
    }

    // convert name to title case
    name = toTitleCase(name);
    const fund = new Fund({
      name,
      generalInterest,
      members: [myuser._id],
      admins: [myuser._id],
    });

    await fund.save();
    success = true;
    const uri = `http://172.20.44.180:5173/joinfund/${fund._id}`;
    QRCode.toDataURL(uri, function (err, imgurl) {
      return res.json({ success: true, imgurl, uri });
    });
  } catch (err) {
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
};

const joinFund = async (req: CustomRequest, res: Response) => {
  const { fundId } = req.body;
  let success = false;
  const user = req.user;
  try {
    // check if user is valid
    if (!user) {
      return res.status(401).json({ success, error: "Unauthorized" });
    }
    const myuser = await User.findById(user.id);
    if (!myuser) {
      return res.status(401).json({ success, error: "Unauthorized" });
    }

    // check if fund is valid
    let fund = await Fund.findOne({ _id: fundId });
    if (!fund) {
      return res.status(400).json({ success, error: "Fund not found" });
    }

    // check if user is already a member
    if (fund.members.includes(myuser._id)) {
      return res
        .status(400)
        .json({ success, error: "You are already a member of this fund" });
    }

    // join fund
    fund.members.push(myuser._id);
    await fund.save();
    success = true;
    return res.json({
      success,
      info: "You have successfully joined the fund",
    });
  } catch (err) {
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
};

const getMyFunds = async (req: CustomRequest, res: Response) => {
  const user = req.user;
  let success = false;
  try {
    // check if user is valid
    if (!user) {
      return res.status(401).json({ success, error: "Unauthorized" });
    }
    const myuser = await User.findById(user.id);

    if (!myuser) {
      return res.status(401).json({ success, error: "Unauthorized" });
    }

    const funds = await Fund.find({ members: myuser._id });
    success = true;
    return res.json({ success, funds });
  } catch (err) {
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
}

const getFundQR = async (req: CustomRequest, res: Response) => {
  const { fundId } = req.body;
  let success = false;
  try {
    const uri = `http://172.20.44.180:5173/joinfund/${fundId}`;
    QRCode.toDataURL(uri, function (err, imgurl) {
      return res.json({ success: true, imgurl, uri });
    });
  } catch (err) {
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
}

export { createFund, joinFund, getMyFunds, getFundQR };