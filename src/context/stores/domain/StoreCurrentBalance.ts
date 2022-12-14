import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class StoreCurrentBalance {
  readonly value: number;
  constructor(value: number) {
    this.guard(value);
    this.value = value;
  }
  private guard(value: number): void {
    if (!!isNaN(value) || value < 0) {
      throw new InvalidArgumentError("currentBalance is not a number valid");
    }
  }
}
