import { Request, Response } from "express";
import httpStatus from "http-status";
import { InvalidArgumentError } from "../context/shared/domain/InvalidArgumentError";
import { StoresByCriteriaSearcher } from "../context/stores/application/StoresByCriteriaSearcher";
import { Store } from "../context/stores/domain/Store";
import { Controller } from "./Controller";
export class StoresGetController implements Controller {
  constructor(private storesByCriteriaSearcher: StoresByCriteriaSearcher) {}

  async run(_req: Request, res: Response) {
    try {
      const { query: queryParams } = _req;
      const { q: filter, limit, page } = queryParams;
      const queryResponse = await this.storesByCriteriaSearcher.run(
        filter ? (filter as string) : "{}",
        Number(limit) || 15,
        Number(page) || 1
      );
      res.header("Access-Control-Allow-Origin", "*");
      res
        .status(httpStatus.OK)
        .send(
          this.toResponse(
            queryResponse.stores,
            queryResponse.limit,
            queryResponse.page,
            queryResponse.count
          )
        );
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }
  }

  private toResponse(
    stores: Array<Store>,
    limit: number,
    page: number,
    count: number
  ) {
    const data = stores.map((store) => {
      return {
        ID: store._id?.value,
        Comercio: store.name.value,
        CUIT: store.cuit.value,
        Conceptos: store.concepts.value,
        "Balance actual:": Intl.NumberFormat("en-US").format(
          +store.currentBalance.value
        ),
        Activo: store.active.value ? "Si" : "No",
        "Última venta": Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(store.lastSale.value),
      };
    });
    return {
      data,
      page: page,
      limit,
      pages: Math.ceil(count / limit),
      count,
    };
  }
}
