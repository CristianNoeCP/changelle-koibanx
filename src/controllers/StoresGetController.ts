import { Request, Response } from "express";
import httpStatus from "http-status";
import { StoresByCriteriaSearcher } from "../context/stores/application/StoresByCriteriaSearcher";
import { Controller } from "./Controller";
export class StoresGetController implements Controller {
  constructor(private storesByCriteriaSearcher: StoresByCriteriaSearcher) {}

  async run(_req: Request, res: Response) {
    const { query: queryParams } = _req;
    const { filters, limit, offset } = queryParams;

    const algo = await this.storesByCriteriaSearcher.run(
      filters ? filters : undefined,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    );
    console.log({ algo });

    res.status(httpStatus.OK).send(filters);
  }
}
