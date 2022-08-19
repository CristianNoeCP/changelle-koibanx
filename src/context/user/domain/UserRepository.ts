import { IUser } from "./user";

export interface UserRepository {
  find(username: string): Promise<IUser | null>;
}
