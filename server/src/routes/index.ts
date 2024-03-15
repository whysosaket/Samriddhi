import { Router } from "express";
import auth from "./auth";
import fund from "./fund";
import user from "./user";


const router = Router();

export default (): Router => {
  auth(router);
  fund(router);
  user(router);
  return router;
};