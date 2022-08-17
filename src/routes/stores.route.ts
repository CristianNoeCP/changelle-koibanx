import express, { Request, Response } from "express";
import httpStatus from "http-status";
const router = express.Router();

router
  .route("/stores")
  .get((req: Request, res: Response) => res.status(httpStatus.OK).send());

export default router;
