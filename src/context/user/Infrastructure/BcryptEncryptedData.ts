import { EncryptedData } from "../domain/EncryptedData";
const bcrypt = require("bcrypt-nodejs");
export class BcryptEncryptedData implements EncryptedData {
  validate(data: string, dataEncrypted: string): boolean {
    return bcrypt.compareSync(data, dataEncrypted);
  }
}
