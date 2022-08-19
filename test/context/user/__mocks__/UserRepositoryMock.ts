import { IUser } from "../../../../src/context/user/domain/user";
import { UserRepository } from "../../../../src/context/user/domain/UserRepository";

export class UserRepositoryMock implements UserRepository {
  private mockFind = jest.fn();
  private user: IUser | null = null;
  async find(username: string): Promise<IUser | null> {
    this.mockFind(username);
    return this.user;
  }

  returnUserData(user: IUser) {
    this.user = user;
  }
}
