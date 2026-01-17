exports.up = function (knex) {
  return knex.schema.hasTable("users").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("users", function (table) {
        table.increments("id");
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("role", 50).defaultTo("user");
        table.boolean("is_active").defaultTo(true);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.timestamp("deleted_at").nullable();

        // Add unique constraint
        table.unique("email");
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
