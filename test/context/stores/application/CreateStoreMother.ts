import { Store } from "../../../../src/context/stores/domain/Store";

export class CreateStoreMother {
  static create(): Store {
    return Store.fromPrimitives({
      active: true,
      concepts: [],
      cuit: "",
      currentBalance: 0,
      lastSale: new Date(),
      name: "",
    });
  }
}
