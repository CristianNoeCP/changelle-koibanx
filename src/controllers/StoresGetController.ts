import { Request, Response } from "express";
import httpStatus from "http-status";
import { StoresByCriteriaSearcher } from "../context/stores/application/StoresByCriteriaSearcher";
import { IStore } from "../context/stores/domain/Store";
import { Controller } from "./Controller";
export class StoresGetController implements Controller {
  constructor(private storesByCriteriaSearcher: StoresByCriteriaSearcher) {}

  async run(_req: Request, res: Response) {
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
  }

  private toResponse(
    stores: Array<IStore>,
    limit: number,
    page: number,
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
      page: page,
      limit,
      pages: Math.ceil(count / limit),
      count,
    };
  }
}
