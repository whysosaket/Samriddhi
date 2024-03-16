import { Router } from "express";
import auth from "./auth";
import fund from "./fund";
import user from "./user";
import loan from "./loan";
import flask from "./flask";


const router = Router();

export default (): Router => {
  auth(router);
  fund(router);
  user(router);
  loan(router);
  flask(router);
  return router;
};