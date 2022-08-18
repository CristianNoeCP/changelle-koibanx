import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class StoreConcepts {
  readonly value: Array<String>;
  constructor(value: Array<String>) {
    this.guard(value);
    this.value = value;
  }
  private guard(value: Array<String>): void {
    if (!Array.isArray(value)) {
      throw new InvalidArgumentError("concepts is not an array");
    }
  }
}
