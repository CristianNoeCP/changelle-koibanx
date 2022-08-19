import { IUser } from "../domain/user";

export interface UserRepository {
  find(username: string): Promise<IUser | null>;
}
