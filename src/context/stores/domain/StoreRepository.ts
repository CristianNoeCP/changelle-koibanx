export interface StoreRepository {
  matching(): Promise<Array<any>>;
}
