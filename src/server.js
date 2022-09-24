import express from "express";
import cors from "cors";

import mainRoutes from "./router";
import appConfig from "./config/app";
import { middlewares } from "./app/middlewares";
import { apiUrl } from "./helpers/constants";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ exposedHeaders: ["Content-Disposition"] }));

app.use(express.json());
app.use(middlewares);
app.use(apiUrl, mainRoutes);


app.listen(appConfig.APP_PORT);
