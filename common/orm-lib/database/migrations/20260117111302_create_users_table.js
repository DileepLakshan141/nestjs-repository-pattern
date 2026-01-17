exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    // Primary key
    table.increments("id").primary();

    // User fields
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.string("role", 50).defaultTo("user");
    table.boolean("is_active").defaultTo(true);

    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();

    // Indexes
    table.index("email");
    table.index("role");
    table.index("is_active");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
