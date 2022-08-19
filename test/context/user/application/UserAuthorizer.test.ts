import { UserAuthorizer } from "../../../../src/context/user/application/UserAuthorizer";
import { UserRepositoryMock } from "../__mocks__/UserRepositoryMock";
import { EncryptedDataMock } from "../__mocks__/EncryptedDataMock";
import { CreateTokenMother } from "./CreateTokenMother";
import { InvalidArgumentError } from "../../../../src/context/shared/domain/InvalidArgumentError";
let repository: UserRepositoryMock;
let encrypt: EncryptedDataMock;
let authorizer: UserAuthorizer;

beforeEach(() => {
  repository = new UserRepositoryMock();
  encrypt = new EncryptedDataMock();
  authorizer = new UserAuthorizer(repository, encrypt);
});

describe("UserAuthorizer", () => {
  it("should is valid token", async () => {
    const user = CreateTokenMother.createUser();
    const token = CreateTokenMother.create(user);
    repository.returnUserData(user);
    const isValid = authorizer.run(token);
    expect(isValid).toBeTruthy();
  });
  it("should is invalid token", async () => {
    try {
      authorizer.run("invalid");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidArgumentError);
    }
  });
});
