import {
  Params,
  StoreCreator,
} from "../../../../src/context/stores/application/StoreCreator";
import { StoreRepositoryMock } from "../__mocks__/StoreRepositoryMock";
import { CreateStoreMother } from "./CreateStoreMother";
let repository: StoreRepositoryMock;
let creator: StoreCreator;

beforeEach(() => {
  repository = new StoreRepositoryMock();
  creator = new StoreCreator(repository);
});

describe("StoreCreator", () => {
  it("should create a valid store", async () => {
    const store = CreateStoreMother.create();
    creator.run(store.toPrimitives() as Params);
    repository.assertLastSavedStoreIs(store);
  });
});
