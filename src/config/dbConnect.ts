import { Sequelize } from "sequelize";
import { config } from "dotenv";
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
export default sequelize;
