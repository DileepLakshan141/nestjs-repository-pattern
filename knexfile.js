require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "task_management",
    },
    migrations: {
      directory: "./common/orm-lib/database/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./common/orm-lib/database/seeds",
    },
  },
};
