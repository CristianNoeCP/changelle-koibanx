import express, { Request, Response } from "express";
import { StoresByCriteriaSearcher } from "../context/stores/application/StoresByCriteriaSearcher";
import { MongoStoreRepository } from "../context/stores/infrastructures/MongoStoreRepository";
import { StoresGetController } from "../controllers/StoresGetController";
import { StoresPostController } from "../controllers/StoresPostController";
const router = express.Router();
const storesGetController = new StoresGetController(
  new StoresByCriteriaSearcher(new MongoStoreRepository())
);

const storesPostController = new StoresPostController(
  new StoresByCriteriaSearcher(new MongoStoreRepository())
);

router
  .route("/stores")
  .get((req: Request, res: Response) => storesGetController.run(req, res))
  .post((req: Request, res: Response) => storesPostController.run(req, res));

export default router;
