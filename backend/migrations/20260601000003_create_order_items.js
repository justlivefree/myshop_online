/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary();
    table.integer('order_id').unsigned().notNullable()
      .references('id').inTable('orders').onDelete('CASCADE');
    table.integer('product_id').unsigned()
      .references('id').inTable('products').onDelete('SET NULL');
    table.string('name', 255).notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('discount').defaultTo(0);
    table.decimal('discounted_price', 10, 2);
    table.integer('quantity').notNullable();
    table.string('image', 500);
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('order_items');
}
