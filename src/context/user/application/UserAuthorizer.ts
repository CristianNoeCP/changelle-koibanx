import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";
import { UserRepository } from "../domain/UserRepository";
import { EncryptedData } from "../domain/EncryptedData";

export class UserAuthorizer {
  constructor(
    private repository: UserRepository,
    private validator: EncryptedData
  ) {}
  async run(token: string): Promise<boolean> {
    if (!token) throw new InvalidArgumentError("Invalid token");
    const [basic, tokenValue] = token.split(" ");
    if (basic !== "Basic") throw new InvalidArgumentError("Invalid token");
    const credentials = Buffer.from(tokenValue, "base64").toString("ascii");
    const [username, password] = credentials.split(":");
    const user = await this.repository.find(username);
    if (!user) throw new InvalidArgumentError("Invalid token");
    if (!this.validator.validate(password, user.password))
      throw new InvalidArgumentError("Invalid token");

    return true;
  }
}
