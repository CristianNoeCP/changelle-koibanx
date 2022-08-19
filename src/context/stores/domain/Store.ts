import { StoreName } from "./StoreName";
import { StoreCuit } from "./StoreCuit";
import { StoreConcepts } from "./StoreConcepts";
import { StoreCurrentBalance } from "./StoreCurrentBalance";
import { StoreActive } from "./StoreActive";
import { StoreLastSale } from "./StoreLastSale";
import { StoreId } from "./StoreId";

export class Store {
  readonly _id: StoreId | undefined;
  readonly name: StoreName;
  readonly cuit: StoreCuit;
  readonly concepts: StoreConcepts;
  readonly currentBalance: StoreCurrentBalance;
  readonly active: StoreActive;
  readonly lastSale: StoreLastSale;

  constructor(
    name: StoreName,
    cuit: StoreCuit,
    concepts: StoreConcepts,
    currentBalance: StoreCurrentBalance,
    active: StoreActive,
    lastSale: StoreLastSale,
    _id?: StoreId
  ) {
    this._id = _id;
    this.name = name;
    this.cuit = cuit;
    this.concepts = concepts;
    this.currentBalance = currentBalance;
    this.active = active;
    this.lastSale = lastSale;
  }

  static fromPrimitives(plainData: {
    name: string;
    cuit: string;
    concepts: Array<string>;
    currentBalance: number;
    active: boolean;
    lastSale: Date;
    _id?: string;
  }): Store {
    return new Store(
      new StoreName(plainData.name),
      new StoreCuit(plainData.cuit),
      new StoreConcepts(plainData.concepts),
      new StoreCurrentBalance(plainData.currentBalance),
      new StoreActive(plainData.active),
      new StoreLastSale(plainData.lastSale),
      plainData._id ? new StoreId(plainData._id) : undefined
    );
  }

  toPrimitives() {
    return {
      ...(this._id && { _id: this._id.value }),
      name: this.name.value,
      cuit: this.cuit.value,
      concepts: this.concepts.value,
      currentBalance: this.currentBalance.value,
      active: this.active.value,
      lastSale: this.lastSale.value,
    };
  }
}
