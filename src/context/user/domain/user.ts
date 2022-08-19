import { Schema, model } from "mongoose";
let bcrypt = require("bcrypt-nodejs");

export const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
export interface IUser {
  _id: string | undefined;
  username: string;
  password: string;
}
UserSchema.pre("save", async function (callback) {
  let user = this;

  bcrypt.genSalt(5, function (err: any, salt: any) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function (err: any, hash: any) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

export const UserModel = model<IUser>("User", UserSchema);
