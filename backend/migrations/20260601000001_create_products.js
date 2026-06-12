/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('category', 50).notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('discount').defaultTo(0);
    table.integer('stock').defaultTo(0);
    table.string('image', 500);
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('products');
}
