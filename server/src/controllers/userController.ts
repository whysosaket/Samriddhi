import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";
import Fund from "../models/Fund";
import Transaction from "../models/Transaction";
import UPI from "../models/UPI";

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

    if(amount <= 0){
      return res.status(400).json({ success, error: "Invalid amount" });
    }

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
    if(amount <= 0){
      return res.status(400).json({ success, error: "Invalid amount" });
    }

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

const pay = async (req: CustomRequest, res: Response) => {
  let {sender, message, date} = req.body;
  console.log(sender);
  
  try{
    sender = sender.split("+91")[1];
    let receiver = message.split(" ")[0];
    let amount = parseInt(message.split(" ")[1]);
    let dateN = date;

    // console.log(sender, message, date);

    // checking if sender and receiver are valid
    sender = await User.findOne({phone: sender});
    receiver = await User.findOne({ phone: receiver });

    if(!sender || !receiver){
      console.log("Invalid sender or receiver");
      return res.status(400).json({success: false, error: "Invalid sender or receiver"});
    }

    // checking if sender has enough balance
    if(sender.balance < amount){
      console.log("Insufficient balance");
      return res.status(400).json({success: false, error: "Insufficient balance"});
    }

    // checking if UPI transaction has not been done before
    let upi = await UPI.findOne({sender: sender.phone, receiver: receiver.phone, amount, dateN});
    if(upi){
      console.log("Transaction already done");
      return res.status(400).json({success: false, error: "Transaction already done"});
    }

    // updating the balance of sender and receiver
    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();

    // create Transaction
    let transaction2 = new Transaction({
      amount,
      by: sender._id,
      type: "debit",
    });

    await transaction2.save();

    // creating the UPI transaction
    let transaction = new UPI({
      sender: sender.phone,
      receiver: receiver.phone,
      amount,
      dateN
    });

    await transaction.save();
    console.log("Transaction Successful");
    return res.json({success: true, message: "Transaction Successful"});
  }catch(err){
    return res.status(500).json({success: false, error: "Internal Server Error"});
  }
};


export { depositFund, withdrawFund, pay };
