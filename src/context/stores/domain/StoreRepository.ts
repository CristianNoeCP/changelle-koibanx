import { IStore } from "./Store";

export interface StoreRepository {
  matching(
    filters: string,
    limit: number,
    offset: number
  ): Promise<{ stores: Array<IStore>; total: number }>;
}
