import { EncryptedData } from "../../../../src/context/user/domain/EncryptedData";

export class EncryptedDataMock implements EncryptedData {
  private mockValidate = jest.fn();
  validate(data: string, dataEncrypted: string): boolean {
    this.mockValidate(data, dataEncrypted);
    return true;
  }
}
