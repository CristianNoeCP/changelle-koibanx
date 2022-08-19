import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class StoreLastSale {
  readonly value: Date;
  constructor(value: Date) {
    this.guard(value);
    this.value = new Date(value);
  }
  private guard(value: Date): void {
    if (isNaN(new Date(value).getDay())) {
      throw new InvalidArgumentError("lastSale is not a date");
    }
  }
}
