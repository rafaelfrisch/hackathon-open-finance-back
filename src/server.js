import express from "express";
import cors from "cors";

import mainRoutes from "./router";
import appConfig from "./config/app";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ exposedHeaders: ["Content-Disposition"] }));

app.use(express.json());
app.use("/api", mainRoutes);

app.listen(appConfig.APP_PORT);
