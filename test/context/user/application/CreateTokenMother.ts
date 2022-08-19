import { IUser } from "../../../../src/context/user/domain/user";

const BASIC = "Basic";
export class CreateTokenMother {
  static create(user: IUser): string {
    return `${BASIC} ${Buffer.from(
      `${user.username}:${user.password}`
    ).toString("base64")}`;
  }
  static createUser(): IUser {
    return {
      _id: "5e9f8f8f8f8f8f8f8f8f8f8",
      username: "username",
      password: "password",
    };
  }
}
