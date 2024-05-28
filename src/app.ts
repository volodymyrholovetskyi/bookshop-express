import express, { Express } from "express";
import routers from "./shared/routers/bookRouter";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./shared/exceptions/globalErrorHandler";
import log4js, { Configuration } from "log4js";
import { config } from "./shared/config";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL || "";

export default async () => {
  const app: Express = express();

  app.use(express.json({ limit: "1mb" }));

  app.use("/", routers);
  app.use(errorHandler);
  log4js.configure(config.log4js as Configuration);

  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}. Server ready...`);
  });

  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000,
  } as ConnectOptions);
};
