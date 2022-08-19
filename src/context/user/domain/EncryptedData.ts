export interface EncryptedData {
  validate(data: string, dataEncrypted: string): boolean;
}
