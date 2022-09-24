import { Prisma, PrismaClient } from "@prisma/client";

const logLevel = (
  process.env.NODE_ENV === "dev" && process.env.DEBUG === "true" ? ["error", "info", "query", "warn"] : ["error"]
);

const databaseURL = process.env.DATABASE_URL;

const prisma = new PrismaClient({
  log: logLevel,
  datasources: {
    db: {
      url: databaseURL,
    },
  },
});

export default prisma;
