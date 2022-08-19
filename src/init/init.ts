import Mongoose from "mongoose";
import { UserModel } from "../context/user/domain/user";
const client = async () => {
  return Mongoose.connect(
    `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_DBNAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
};
const disconnected = () => {
  return Mongoose.connection.close();
};
export const init = async () => {
  await client();
  if (await UserModel.countDocuments({ username: "test@koibanx.com" })) {
    return;
  }

  let user = new UserModel();
  user.username = "test@koibanx.com";
  user.password = "test123";
  await UserModel.create(user);
  await disconnected();
};
