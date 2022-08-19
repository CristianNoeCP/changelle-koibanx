import express, { NextFunction, Request, Response } from "express";
import { StoreCreator } from "../context/stores/application/StoreCreator";
import { StoresByCriteriaSearcher } from "../context/stores/application/StoresByCriteriaSearcher";
import { MongoStoreRepository } from "../context/stores/Infrastructure/MongoStoreRepository";
import { UserAuthorizer } from "../context/user/application/UserAuthorizer";
import { BcryptEncryptedData } from "../context/user/Infrastructure/BcryptEncryptedData";
import { MongoUserRepository } from "../context/user/Infrastructure/MongoUserRepository";
import { AuthValidate } from "../controllers/AuthValidate";
import { StoresGetController } from "../controllers/StoresGetController";
import { StoresPostController } from "../controllers/StoresPostController";
const router = express.Router();
const storesGetController = new StoresGetController(
  new StoresByCriteriaSearcher(new MongoStoreRepository())
);
const authValidateController = new AuthValidate(
  new UserAuthorizer(new MongoUserRepository(), new BcryptEncryptedData())
);
const storesPostController = new StoresPostController(
  new StoreCreator(new MongoStoreRepository())
);

router
  .route("/stores")
  .get([
    (req: Request, res: Response, next: NextFunction) =>
      authValidateController.run(req, res, next),
    (req: Request, res: Response) => storesGetController.run(req, res),
  ])
  .post([
    (req: Request, res: Response, next: NextFunction) =>
      authValidateController.run(req, res, next),
    (req: Request, res: Response) => storesPostController.run(req, res),
  ]);

export default router;
