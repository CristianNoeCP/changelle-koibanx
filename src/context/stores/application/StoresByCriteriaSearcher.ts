import { StoreRepository } from "../domain/StoreRepository";

export class StoresByCriteriaSearcher {
  constructor(private storeRepository: StoreRepository) {}

  async run(filters?: any, limit?: number, offset?: number): Promise<any> {
    const stores = await this.storeRepository.matching();
    return stores;
  }
}
