import { Request, Response } from "express";
import httpStatus from "http-status";
import { InvalidArgumentError } from "../context/shared/domain/InvalidArgumentError";
import { StoresByCriteriaSearcher } from "../context/stores/application/StoresByCriteriaSearcher";
// import { IStore } from "../context/stores/domain/Store";
import { Controller } from "./Controller";
export class StoresPostController implements Controller {
  constructor(private storesByCriteriaSearcher: StoresByCriteriaSearcher) {}
  async run(req: Request, res: Response) {
    try {
      const { body } = req;
      const name: String = body.name;
      const cuit: String = body.cuit;
      const concepts: Array<String> = body.concepts;
      const currentBalance: String = body.currentBalance;
      const active: String = body.active;
      const lastSale: String = body.lastSale;
      console.log(
        { name, cuit, concepts, currentBalance, active, lastSale },
        this.storesByCriteriaSearcher
      );

      res.header("Access-Control-Allow-Origin", "*");
      res.status(httpStatus.CREATED);
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }
  }
}
