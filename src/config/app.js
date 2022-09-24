import { config } from "dotenv";

config();

const appConfig = {
  APP_PORT: process.env.APP_PORT,
};

export default appConfig;
