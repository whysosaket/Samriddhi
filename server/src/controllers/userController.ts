import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";
import Fund from "../models/Fund";
import Transaction from "../models/Transaction";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

import {
  isEmailValid,
  toTitleCase,
  generateRandomString,
} from "../utils/UserHelper";

import CustomRequest from "../types/CustomRequest";

const depositFund = async (req: CustomRequest, res: Response) => {
  let { amount, fundId } = req.body;
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

    if (fundId) {
      let fund = await Fund.findById(fundId);
      if (!fund) {
        return res.status(400).json({ success, error: "Fund not found" });
      }

      let transaction = new Transaction({
        amount,
        by: myuser._id,
        type: "credit",
      });

      await transaction.save();

      fund.balance += amount;
      fund.transactions.push(transaction._id);
      await fund.save();
      success = true;
      return res.json({ success, balance: fund.balance });
    } else {
      myuser.balance += amount;
      let transaction = new Transaction({
        amount,
        by: myuser._id,
        type: "credit",
      });
      await transaction.save();
      await myuser.save();
      success = true;
      return res.json({ success, balance: myuser.balance });
    }
  } catch (err) {
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
};

const withdrawFund = async (req: CustomRequest, res: Response) => {
  let { amount, fundId } = req.body;
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

    if (fundId) {
      let fund = await Fund.findById(fundId);
      if (!fund) {
        return res.status(400).json({ success, error: "Fund not found" });
      }

      let transaction = new Transaction({
        amount,
        by: myuser._id,
        type: "debit",
      });

      await transaction.save();

      fund.balance -= amount;
      // check if fund has enough balance
        if (fund.balance < 0) {
            return res.status(400).json({ success, error: "Insufficient balance" });
        }

      fund.transactions.push(transaction._id);
      await fund.save();
      success = true;
      return res.json({ success, balance: fund.balance });
    } else {
      myuser.balance -= amount;
        // check if user has enough balance
            if (myuser.balance < 0) {
                return res.status(400).json({ success, error: "Insufficient balance" });
            }
      let transaction = new Transaction({
        amount,
        by: myuser._id,
        type: "debit",
      });
      await transaction.save();
      await myuser.save();
      success = true;
      return res.json({ success, balance: myuser.balance });
    }
  } catch (err) {
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
};

export { depositFund, withdrawFund };
