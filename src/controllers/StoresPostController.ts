import { Request, Response } from "express";
import httpStatus from "http-status";
import { InvalidArgumentError } from "../context/shared/domain/InvalidArgumentError";
import { StoreCreator } from "../context/stores/application/StoreCreator";
import { Controller } from "./Controller";
export class StoresPostController implements Controller {
  constructor(private storesCreator: StoreCreator) {}
  async run(req: Request, res: Response) {
    try {
      const { body } = req;
      const name: string = body.name;
      const cuit: string = body.cuit;
      const concepts: Array<string> = body.concepts;
      const currentBalance: number = body.currentBalance;
      const active: boolean = body.active;
      const lastSale: string = body.lastSale;
      await this.storesCreator.run({
        name,
        cuit,
        concepts,
        currentBalance,
        active,
        lastSale,
      });

      res.header("Access-Control-Allow-Origin", "*");
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }
  }
}
