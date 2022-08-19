import { InvalidArgumentError } from "../../../../src/context/shared/domain/InvalidArgumentError";
import { StoresByCriteriaSearcher } from "../../../../src/context/stores/application/StoresByCriteriaSearcher";
import { StoreRepositoryMock } from "../__mocks__/StoreRepositoryMock";
import { CreateStoreMother } from "./CreateStoreMother";
let repository: StoreRepositoryMock;
let creator: StoresByCriteriaSearcher;

beforeEach(() => {
  repository = new StoreRepositoryMock();
  creator = new StoresByCriteriaSearcher(repository);
});

describe("StoresByCriteriaSearcher", () => {
  it("should find stores filter by criteria", async () => {
    const stores = [CreateStoreMother.create(), CreateStoreMother.create()];
    const filters = {
      filter: '{"name": "Bread"}',
      page: 1,
      limit: 10,
    };
    repository.returnMatching(stores);
    const response = await creator.run(
      filters.filter,
      filters.limit,
      filters.page
    );
    repository.assertMatchingHasBeenCalledWith();
    expect(response.stores).toEqual(stores);
    expect(response.count).toEqual(stores.length);
  });
  it("should catch the error when filter is an invalid value", async () => {
    try {
      const filters = {
        filter: "invalid",
        page: 1,
        limit: 10,
      };
      await creator.run(filters.filter, filters.limit, filters.page);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidArgumentError);
    }
  });
});
