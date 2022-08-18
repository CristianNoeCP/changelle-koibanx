import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class StoreActive {
  readonly value: boolean;
  constructor(value: boolean) {
    this.guard(value);
    this.value = value;
  }
  private guard(value: boolean): void {
    if (value !== true && value !== false) {
      throw new InvalidArgumentError("active is not a boolean");
    }
  }
}
