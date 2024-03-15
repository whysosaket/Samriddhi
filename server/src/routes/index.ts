import { Router } from "express";
import auth from "./auth";
import fund from "./fund";


const router = Router();

export default (): Router => {
  auth(router);
  fund(router);
  return router;
};