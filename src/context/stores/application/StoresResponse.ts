import { IStore } from "../domain/Store";

export class StoresResponse {
  readonly stores: Array<IStore>;
  readonly limit: number;
  readonly page: number;
  readonly count: number;

  constructor(
    stores: Array<IStore>,
    limit: number,
    page: number,
    count: number
  ) {
    this.stores = stores;
    this.limit = limit;
    this.page = page;
    this.count = count;
  }
}
