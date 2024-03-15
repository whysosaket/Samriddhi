import { Router } from "express";
import auth from "./auth";
import fund from "./fund";
import user from "./user";
import loan from "./loan";


const router = Router();

export default (): Router => {
  auth(router);
  fund(router);
  user(router);
  loan(router);
  return router;
};