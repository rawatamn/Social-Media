import express, { Application, Request, Response } from "express";
import { dbConnect } from "./config/dbConnect.js";
import "./model/usersModel.js";
import { config } from "dotenv";
import allRoutes from "./routes/allRoutes.js";
import MessageUtils from "./utils/messageUtils.js";
import { mainRoutes } from "./utils/indexRoutes.js";
import logger from "./utils/logger.js";
config();

const app: Application = express();

dbConnect();
app.use(express.json());

app.use(mainRoutes.API, allRoutes);

app.listen(Number(process.env.PORT), () => {
  logger.info("server is running");
});
