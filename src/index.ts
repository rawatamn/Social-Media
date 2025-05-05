import express, { Application, Request, Response } from "express";
import sequelize from "./config/dbConnect.js";
import "./model/usersModel.js";
import { config } from "dotenv";
import allRoutes from "./routes/allRoutes.js";
import MessageUtils from "./utils/messageUtils.js";
config();

const app: Application = express();


sequelize
  .authenticate()
  .then(() => {
    console.log(MessageUtils.SUCCESS.DATABASE_CONNECTION_SUCESSFUL);
  })
  .catch((error) => {
    console.error(MessageUtils.ERROR.UNABLE_TO_CONNECT_DATABASE, error.message);
  });
app.use(express.json());

app.use("/api", allRoutes);

app.listen(Number(process.env.PORT), () => {
  console.log("server is running");
});
