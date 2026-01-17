import Knex from "knex";
import { Model } from "objection";
import * as dotenv from "dotenv";

dotenv.config();

const knexConfig = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "task_management",
  },
  pool: { min: 2, max: 10 },
  migrations: {
    directory: "./common/orm-lib/database/migrations",
    tableName: "knex_migrations",
  },
};

const knex = Knex(knexConfig);
Model.knex(knex);

export default knex;
