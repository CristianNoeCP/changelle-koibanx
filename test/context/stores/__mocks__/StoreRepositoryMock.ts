import { Store } from "../../../../src/context/stores/domain/Store";
import { StoreFilter } from "../../../../src/context/stores/domain/StoreFilter";
import { StoreLimit } from "../../../../src/context/stores/domain/StoreLimit";
import { StorePage } from "../../../../src/context/stores/domain/StorePage";
import { StoreRepository } from "../../../../src/context/stores/domain/StoreRepository";

export class StoreRepositoryMock implements StoreRepository {
  private mockMatching = jest.fn();
  private mockCount = jest.fn();
  private mockSave = jest.fn();
  private stores: Array<Store> = [];
  async matching(
    filter: StoreFilter,
    limit: StoreLimit,
    page: StorePage
  ): Promise<Store[]> {
    this.mockMatching(filter, limit, page);
    return this.stores;
  }
  async save(store: Store): Promise<void> {
    this.mockSave(store);
  }
  async count(filter: StoreFilter): Promise<number> {
    this.mockCount(filter);
    return 1;
  }
  assertLastSavedStoreIs(expected: Store): void {
    const mock = this.mockSave.mock;
    const lastSavedStore = mock.calls[mock.calls.length - 1][0] as Store;
    console.log({ lastSavedStore }, { expected });

    expect(lastSavedStore).toBeInstanceOf(Store);
    expect(lastSavedStore.toPrimitives()).toEqual(expected.toPrimitives());
  }
}
