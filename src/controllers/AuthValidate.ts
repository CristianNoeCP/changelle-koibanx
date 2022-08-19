import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { InvalidArgumentError } from "../context/shared/domain/InvalidArgumentError";
import { UserAuthorizer } from "../context/user/application/UserAuthorizer";

export class AuthValidate {
  constructor(private userAuthorizer: UserAuthorizer) {}
  async run(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userAuthorizer.run(req.headers.authorization as string);
      next();
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }
  }
}
