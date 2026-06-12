/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.string('customer_name', 255).notNullable();
    table.string('customer_phone', 50).notNullable();
    table.string('location_user', 500).notNullable();
    table.decimal('subtotal', 10, 2).notNullable();
    table.decimal('discount', 10, 2).defaultTo(0);
    table.decimal('total', 10, 2).notNullable();
    table.string('status', 50).defaultTo('topshirilmagan');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('orders');
}
