import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";
import Fund from "../models/Fund";
import Notifications from "../models/Notifications";
import Loan from "../models/Loan";

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

const createLoan = async (req: CustomRequest, res: Response) => {
  let { amount, interest, duration, fundId } = req.body;
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

    let funds = await Fund.find({ members: myuser._id });

    let fund;

    if (fundId) {
      fund = await Fund.findOne({ _id: fundId });
    }

    if (!fund || fund.balance < amount) {
      // check if other funds have enough balance
      let found = false;
      for (let i = 0; i < funds.length; i++) {
        if (funds[i].balance >= amount) {
          fund = funds[i];
          found = true;
          break;
        }
      }
      if (!found) {
        return res.status(400).json({ success, error: "Insufficient balance" });
      }
    }

    let loan = new Loan({
      amount,
      interest,
      duration,
      user: myuser._id,
      status: "pending",
      fund,
    });

    // Create notification for every admin in this fund
    if (fund) {
      for (let i = 0; i < fund.admins.length; i++) {
        let notification = new Notifications({
          message: `New loan request of ${amount} from ${myuser.name}`,
          user: fund.admins[i],
        });
        await notification.save();
      }
    }

    await loan.save();
    success = true;
    return res.json({ success, loan });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
};

const approveLoan = async (req: CustomRequest, res: Response) => {
  const { loanId } = req.body;
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

    // get loan fund
    let loan = await Loan.findById(loanId).populate("fund");
    if (!loan) {
      return res.status(400).json({ success, error: "Loan not found" });
    }

    // if loan is already approve return
    if (loan.status === "approved") {
      return res.status(400).json({ success, error: "Loan already approved" });
    }

    // @ts-ignore
    let fund = await Fund.findById(loan.fund._id);

    // check if user is admin of the fund
    // @ts-ignore
    if (!fund.admins.includes(myuser._id)) {
      return res.status(401).json({ success, error: "Unauthorized" });
    }

    const loanuser = await User.findById(loan.user);
    if (!loanuser) {
      return res.status(400).json({ success, error: "User not found" });
    }

    // check how many approved
    let alreadyApproved = loan.approvedBy;
    alreadyApproved += 1;
    loan.approvedBy = alreadyApproved;
    await loan.save();

    // if more than 50% members approved, approve loan
    // @ts-ignore
    if (alreadyApproved > loan.fund.members.length / 2) {
      loan.status = "approved";
      await loan.save();
      // process amount
      // @ts-ignore
      fund.balance -= loan.amount;
      // @ts-ignore
      await fund.save();

      // update user balance
      // @ts-ignore
      loanuser.balance += loan.amount;
      await loanuser.save();

      // create transaction
      // @ts-ignore
      const transaction = new Transaction({
        amount: loan.amount,
        // @ts-ignore
        by: fund._id,
        to: loanuser._id,
        type: "loan",
      });

      // create notification for user
      let notification = new Notifications({
        message: `Your loan of ${loan.amount} has been approved`,
        user: loan.user,
      });
      success = true;
      return res.json({ success, loan });
    }

    success = true;
    return res.json({ success, loan });
  } catch (err) {
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
};

const getLoans = async (req: CustomRequest, res: Response) => {
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

    let loans = await Loan.find({ user: myuser._id }).populate("fund");
    success = true;
    return res.json({ success, loans });
  } catch (err) {
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
};

const getFundLoans = async (req: CustomRequest, res: Response) => {
  let success = false;
  const user = req.user;
  const { fundId } = req.body;
  try {
    // check if user is valid
    if (!user) {
      return res.status(401).json({ success, error: "Unauthorized" });
    }

    const myuser = await User.findById(user.id);
    if (!myuser) {
      return res.status(401).json({ success, error: "Unauthorized" });
    }

    let fund = await Fund.findById(fundId);
    if (!fund) {
      return res.status(400).json({ success, error: "Fund not found" });
    }

    let loans = await Loan.find({ fund: fund._id }).populate("user");
    success = true;
    return res.json({ success, loans });
  } catch (err) {
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
};

const getInterest = async (req: CustomRequest, res: Response) => {
  let success = false;
  const { amount, duration, interest } = req.body;
  try {
    const annualInterestRate = interest / 100;
    const periodsPerYear = 12; // assuming monthly compounding

    const principal = amount;
    const ratePerPeriod = annualInterestRate / periodsPerYear;
    const totalPeriods = duration;

    const compoundInterest =
      principal * Math.pow(1 + ratePerPeriod, totalPeriods) - principal;

    success = true;
    return res.json({ success, interest: compoundInterest });
  } catch (err) {
    return res.status(500).json({ success, error: "Internal Server Error" });
  }
};

export { createLoan, approveLoan, getLoans, getInterest, getFundLoans };
