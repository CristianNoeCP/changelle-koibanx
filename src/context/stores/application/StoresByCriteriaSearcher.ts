import { StoreFilter } from "../domain/StoreFilter";
import { StoreLimit } from "../domain/StoreLimit";
import { StorePage } from "../domain/StorePage";
import { StoreRepository } from "../domain/StoreRepository";
import { StoresResponse } from "./StoresResponse";

export class StoresByCriteriaSearcher {
  constructor(private storeRepository: StoreRepository) {}

  async run(
    filter: string,
    limit: number,
    page: number
  ): Promise<StoresResponse> {
    const stores = await this.storeRepository.matching(
      new StoreFilter(filter),
      new StoreLimit(limit),
      new StorePage(page)
    );
    const total = await this.storeRepository.count(new StoreFilter(filter));
    return new StoresResponse(stores, limit, page, total);
  }
}
