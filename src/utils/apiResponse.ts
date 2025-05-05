import { Response } from "express";
import HttpStatusCodes from "./statusCode.js";
import MessageUtils from "./messageUtils.js";
import logger from "./logger.js";
class APIResponse<T> {
  static success(
    res: Response,
    {
      status = HttpStatusCodes.OK,
      message = MessageUtils.SUCCESS.OK,
      data = {},
    },
  ) {
    return res.status(status).json({ status, message, data });
  }

  static error(
    res: Response,
    message: string = MessageUtils.ERROR.INTERNAL_SERVER_ERROR,
    status: number = HttpStatusCodes.INTERNAL_SERVER_ERROR,
  ) {
    logger.error("API Error:", { status, message });
    return res.status(status).json({ status, message });
  }
}
export { APIResponse };
