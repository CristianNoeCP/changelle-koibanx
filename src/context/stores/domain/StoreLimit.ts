import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class StoreLimit {
  readonly value: number;
  constructor(value: number) {
    this.guard(value);
    this.value = value;
  }
  private guard(value: number): void {
    if (value < 1) {
      throw new InvalidArgumentError("Limit must be greater than 0");
    }
  }
}
