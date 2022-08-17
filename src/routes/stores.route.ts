import express, { Request, Response } from "express";
import { StoresGetController } from "../controllers/StoresGetController";
const router = express.Router();
const storesGetController = new StoresGetController();

router
  .route("/stores")
  .get((req: Request, res: Response) => storesGetController.run(req, res));

export default router;
