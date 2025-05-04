import { Request, Response } from "express";
import { userService } from "../service/userService.js";
import {
  registerValidation,
  loginValidation,
} from "../utils/validation/authValidation.js";
import tokenHandler from "../utils/jwtHandler.js";
import { APIResponse } from "../utils/apiResponse.js";
import MessageUtils from "../utils/messageUtils.js";
import HttpStatusCodes from "../utils/statusCode.js";
//creating a user
const registerUser = async (req: Request, res: Response) => {
  try {
    //checking the validation
    await registerValidation(req.body);
    const result = await userService.registerUser(req.body);

    APIResponse.success(res, {
      status: HttpStatusCodes.CREATED,
      message: MessageUtils.SUCCESS.USER_REGISTERED,
      data: result,
    });
  } catch (error: any) {
    console.error("Register Error:", error.message);
    APIResponse.error(
      res,
      error.message,
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};
//login the user
const login = async (req: Request, res: Response) => {
  try {
    //checking validation
    await loginValidation(req.body);
    const loginInput = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = await userService.loginUser(loginInput);
    const token = tokenHandler.generateToken(user.id);
    APIResponse.success(res, {
      status: HttpStatusCodes.OK,
      message: MessageUtils.SUCCESS.LOGIN_SUCCESS,
      data: { user, token },
    });
  } catch (error: any) {
    console.error("Login Error:", error.message);
    APIResponse.error(
      res,
      error.message,
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

export { registerUser, login };
