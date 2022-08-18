import { StoreRepository } from "../domain/StoreRepository";
import { StoresResponse } from "./StoresResponse";

export class StoresByCriteriaSearcher {
  constructor(private storeRepository: StoreRepository) {}

  async run(
    filters: any,
    limit: number,
    offset: number
  ): Promise<StoresResponse> {
    const { stores, total } = await this.storeRepository.matching(
      filters,
      limit,
      offset
    );
    return new StoresResponse(stores, limit, offset, total);
  }
}
