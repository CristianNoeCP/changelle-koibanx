import { StoreRepository } from "../domain/StoreRepository";
import Mongoose from "mongoose";
import { store } from "../domain/Store";
import { StoreFilter } from "../domain/StoreFilter";
import { StoreLimit } from "../domain/StoreLimit";
import { StorePage } from "../domain/StorePage";

export class MongoStoreRepository implements StoreRepository {
  private client() {
    return Mongoose.connect(
      `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_DBNAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }
  private disconnected() {
    return Mongoose.connection.close();
  }
  public async count(filter: StoreFilter) {
    await this.client();
    const count = await store.countDocuments(filter.value);
    await this.disconnected();
    return count;
  }
  public async matching(
    filter: StoreFilter,
    limit: StoreLimit,
    page: StorePage
  ) {
    await this.client();
    const stores = await store
      .find(filter.value)
      .skip((page.value - 1) * limit.value)
      .limit(limit.value);
    await this.disconnected();
    return stores;
  }
}
