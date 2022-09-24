import express from "express";
import cors from "cors";
import { middlewares } from "../app/middlewares";
import mainRoutes from "../router";

export const createServer = () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors({ exposedHeaders: ["Content-Disposition"] }));

  app.use(mainRoutes);
  app.use(middlewares);

  return app;
};
