import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class StoreFilter {
  readonly value: JSON;
  constructor(value: string) {
    this.value = this.guard(value);
  }
  private guard(value: string): JSON {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new InvalidArgumentError("Filter is invalid JSON");
    }
  }
}
