import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

class PasswordHandler {
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
}

export default PasswordHandler;
