import { StoreRepository } from "../domain/StoreRepository";
import Mongoose from "mongoose";
import { dbConfig } from "../../shared/config";
import { IStore, store } from "../domain/Store";

export class MongoStoreRepository implements StoreRepository {
  private client() {
    return Mongoose.connect(
      "mongodb://" + dbConfig.mongodb.address + "/" + dbConfig.mongodb.dbname,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }

  public async matching(): Promise<IStore[]> {
    await this.client;
    const documents = await store.find({});
    return documents;
  }
}
