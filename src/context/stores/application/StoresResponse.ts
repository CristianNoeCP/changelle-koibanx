import { IStore } from "../domain/Store";

export class StoresResponse {
  readonly stores: Array<IStore>;
  readonly limit: number;
  readonly offset: number;
  readonly count: number;

  constructor(
    stores: Array<IStore>,
    limit: number,
    offset: number,
    count: number
  ) {
    this.stores = stores;
    this.limit = limit;
    this.offset = offset;
    this.count = count;
  }
}
