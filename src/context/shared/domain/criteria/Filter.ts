import { InvalidArgumentError } from "../InvalidArgumentError";

export class Filter {
  readonly field: string;
  readonly operator: string;
  readonly value: string;

  constructor(field: string, operator: string, value: string) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  static fromValues(filters: any): Filter {
    const field = filters.field;
    const operator = filters.operator;
    const value = filters.value;

    if (!field || !operator || !value) {
      throw new InvalidArgumentError(`The filter is invalid`);
    }

    return new Filter(field, operator, value);
  }
}
