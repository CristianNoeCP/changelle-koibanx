import { InvalidArgumentError } from "../../shared/domain/InvalidArgumentError";

export class StoreCuit {
  readonly value: string;
  constructor(value: string) {
    this.guard(value);
    this.value = value;
  }

  private guard(value: string) {
    if (typeof value !== "string" || value === "")
      throw new InvalidArgumentError("Cuit is invalid value");
  }
}
