import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

const FLASK_URL = process.env.FLASK_URL as string;

const chatbot = async (req: Request, res: Response) => {
  const { question } = req.body;
  try {
    const response = await fetch(`${FLASK_URL}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: "Something went wrong!" });
  }
};

const getSchemes = async (req: Request, res: Response) => {
  const { income, age, urban_rular } = req.body;

  try {
    const response = await fetch(`${FLASK_URL}/get_schemes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({income: parseInt(income), age: parseInt(age), urban_rural: urban_rular}),
    });
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: "Something went wrong!" });
  }
};

export { chatbot, getSchemes };
