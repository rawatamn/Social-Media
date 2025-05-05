import { Sequelize } from "sequelize";
import { config } from "dotenv";
import logger from "../utils/logger.js";
import MessageUtils from "../utils/messageUtils.js";
config();
const sequelize = new Sequelize(
  process.env.DB_name as string,
  process.env.DB_USER as string,
  process.env.DB_password as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
  },
);
const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    logger.info(MessageUtils.SUCCESS.DATABASE_CONNECTION_SUCESSFUL);
  } catch (error: any) {
    logger.error(MessageUtils.ERROR.UNABLE_TO_CONNECT_DATABASE, error.message);
  }
};
export { sequelize, dbConnect };
