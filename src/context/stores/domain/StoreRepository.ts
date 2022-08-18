import { IStore } from "./Store";
import { StoreFilter } from "./StoreFilter";
import { StoreLimit } from "./StoreLimit";
import { StorePage } from "./StorePage";

export interface StoreRepository {
  matching(
    filter: StoreFilter,
    limit: StoreLimit,
    page: StorePage
  ): Promise<Array<IStore>>;
  count(filter: StoreFilter): Promise<number>;
}
