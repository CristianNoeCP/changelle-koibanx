import { StoreFilter } from "./StoreFilter";
import { StoreLimit } from "./StoreLimit";
import { StorePage } from "./StorePage";
import { Store } from "./Store";

export interface StoreRepository {
  matching(
    filter: StoreFilter,
    limit: StoreLimit,
    page: StorePage
  ): Promise<Array<Store>>;
  count(filter: StoreFilter): Promise<number>;
  save(store: Store): Promise<void>;
}
