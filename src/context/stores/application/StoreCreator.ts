import { StoreActive } from "../domain/StoreActive";
import { StoreConcepts } from "../domain/StoreConcepts";
import { StoreCuit } from "../domain/StoreCuit";
import { StoreCurrentBalance } from "../domain/StoreCurrentBalance";
import { StoreLastSale } from "../domain/StoreLastSale";
import { StoreName } from "../domain/StoreName";
import { StoreRepository } from "../domain/StoreRepository";
type Params = {
  name: string;
  cuit: string;
  concepts: Array<string>;
  currentBalance: number;
  active: boolean;
  lastSale: string;
};
export class StoreCreator {
  constructor(private storeRepository: StoreRepository) {}
  async run({
    name,
    cuit,
    concepts,
    currentBalance,
    active,
    lastSale,
  }: Params): Promise<boolean> {
    const storeName = new StoreName(name);
    const storeCuit = new StoreCuit(cuit);
    const storeConcepts = new StoreConcepts(concepts);
    const storeCurrentBalance = new StoreCurrentBalance(currentBalance);
    const storeActive = new StoreActive(active);
    const storeLastSale = new StoreLastSale(lastSale);
    console.log(
      {
        storeName,
        storeCuit,
        storeConcepts,
        storeCurrentBalance,
        storeActive,
        storeLastSale,
      },
      this.storeRepository
    );

    return true;
  }
}
