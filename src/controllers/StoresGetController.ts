import { Request, Response } from "express";
import httpStatus from "http-status";
import { StoresByCriteriaSearcher } from "../context/stores/application/StoresByCriteriaSearcher";
import { IStore } from "../context/stores/domain/Store";
import { Controller } from "./Controller";
export class StoresGetController implements Controller {
  constructor(private storesByCriteriaSearcher: StoresByCriteriaSearcher) {}

  async run(_req: Request, res: Response) {
    const { query: queryParams } = _req;
    const { filters, limit, offset } = queryParams;
    const queryResponse = await this.storesByCriteriaSearcher.run(
      filters ? filters : undefined,
      Number(limit) || 15,
      Number(offset) || 0
    );
    res.header("Access-Control-Allow-Origin", "*");
    res
      .status(httpStatus.OK)
      .send(
        this.toResponse(
          queryResponse.stores,
          queryResponse.limit,
          queryResponse.offset,
          queryResponse.count
        )
      );
  }

  private toResponse(
    stores: Array<IStore>,
    limit: number,
    offset: number,
    count: number
  ) {
    const data = stores.map((store) => {
      return {
        ID: store._id,
        Comercio: store.name,
        CUIT: store.cuit,
        Conceptos: store.concepts,
        "Balance actual:": Intl.NumberFormat("en-US").format(
          +store.currentBalance
        ),
        Activo: store.active ? "Si" : "No",
        "Última venta": Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(store.lastSale),
      };
    });
    return {
      data,
      page: offset,
      limit,
      pages: Math.ceil(count / limit),
      count,
    };
  }
}
