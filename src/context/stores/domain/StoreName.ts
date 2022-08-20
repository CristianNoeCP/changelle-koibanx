import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class StoreName {
  readonly value: string;
  constructor(value: string) {
    this.guard(value);
    this.value = value;
  }
  private guard(value: string) {
    if (typeof value !== "string" || value === "")
      throw new InvalidArgumentError("Name is invalid value");
  }
}
