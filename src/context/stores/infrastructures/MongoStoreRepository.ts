import { StoreRepository } from "../domain/StoreRepository";
import Mongoose from "mongoose";
import { store } from "../domain/Store";

export class MongoStoreRepository implements StoreRepository {
  private client() {
    return Mongoose.connect(
      `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_DBNAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }

  public async matching(filters: string, limit: number, offset: number) {
    await this.client();
    const filter = JSON.parse(filters);
    const total = await store.countDocuments(filter);
    const stores = await store
      .find(filter)
      .skip((offset - 1) * limit)
      .limit(limit);
    return { stores, total };
  }
}
