import { Request, Response } from "express";
import httpStatus from "http-status";
import { Controller } from "./Controller";

export class StoresGetController implements Controller {
  constructor() {}

  async run(_req: Request, res: Response) {
    res.status(httpStatus.OK).send();
  }
}
