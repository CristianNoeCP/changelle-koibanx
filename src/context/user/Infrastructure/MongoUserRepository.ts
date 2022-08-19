import Mongoose from "mongoose";
import { UserRepository } from "../application/UserRepository";
import { IUser, UserModel } from "../domain/user";

export class MongoUserRepository implements UserRepository {
  async find(username: string): Promise<IUser | null> {
    await this.client();
    const user = await UserModel.findOne({ username: username });
    await this.disconnected();
    return user;
  }
  private client() {
    return Mongoose.connect(
      `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_DBNAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }
  private disconnected() {
    return Mongoose.connection.close();
  }
}
