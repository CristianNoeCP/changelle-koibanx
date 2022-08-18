import { Schema, model } from "mongoose";

const StoreSchema = new Schema(
  {
    name: String,
    cuit: String,
    concepts: Array,
    currentBalance: Number,
    active: Boolean,
    lastSale: Date,
  },
  { timestamps: true }
);

StoreSchema.pre("save", async function (callback) {
  //completar de ser necesario
});

export interface IStore extends Document {
  _id: string;
  name: String;
  cuit: String;
  concepts: Array<string | number>;
  currentBalance: Number;
  active: Boolean;
  lastSale: Date;
}

export const store = model<IStore>("Store", StoreSchema);
