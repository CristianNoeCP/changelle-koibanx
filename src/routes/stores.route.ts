import express, { Request, Response } from "express";
import { StoresByCriteriaSearcher } from "../context/stores/application/StoresByCriteriaSearcher";
import { MongoStoreRepository } from "../context/stores/infrastructures/MongoStoreRepository";
import { StoresGetController } from "../controllers/StoresGetController";
const router = express.Router();
const storesGetController = new StoresGetController(
  new StoresByCriteriaSearcher(new MongoStoreRepository())
);

router
  .route("/stores")
  .get((req: Request, res: Response) => storesGetController.run(req, res));

export default router;
