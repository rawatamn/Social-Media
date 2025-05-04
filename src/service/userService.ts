import Users from "../model/usersModel.js";
import {
  FindUserInput,
  LoginInput,
  userAttributes,
} from "../utils/interface/interface.js";
import MessageUtils from "../utils/messageUtils.js";
import PasswordHandler from "../utils/passwordHandler.js";

export const userService = {
  //creating register user function
  //using interface here
  registerUser: async (userData: userAttributes) => {
    try {
      const { id, name, email, password } = userData;

      const existingUser = await Users.findOne({ where: { email: email } });
      if (existingUser) {
        throw new Error(MessageUtils.ERROR.EMAIL_ALREADY_EXIST);
      }

      const hashedPassword = await PasswordHandler.hashPassword(password);

      const newUser = await Users.create({
        id,
        name,
        email,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      throw new Error(MessageUtils.ERROR.REGISTRATION_FAILED);
    }
  },
  //creating login function
  //using interface here
  loginUser: async ({ email, password }: LoginInput) => {
    try {
      const user = (await Users.findOne({
        where: { email },
      })) as userAttributes | null;

      if (!user) {
        throw new Error(MessageUtils.ERROR.USER_NOT_FOUND);
      }

      const userData = user;

      const isPasswordValid = PasswordHandler.comparePassword(
        password,
        userData.password,
      );
      if (!isPasswordValid) {
        throw new Error("Invalid Password");
      }

      return userData;
    } catch (error) {
      throw new Error("Login failed");
    }
  },
  //finding the user
  //using interface here
  findUser: async ({ userId }: FindUserInput) => {
    try {
      const user = await Users.findOne({
        where: { id: userId },
      });
      return user;
    } catch (error: any) {
      throw new Error(MessageUtils.ERROR.USER_NOT_FOUND + error.message);
    }
  },
};
