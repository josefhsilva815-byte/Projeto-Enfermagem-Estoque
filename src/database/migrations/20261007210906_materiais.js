/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('materiais', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('instrutor_id').notNullable();
    table.string('nome').notNullable();
    table.integer('quantidade').notNullable();
    table.text('decricao').notNullable().defaultTo('vazio');
    table.enu('categoria', ['material', 'equipamento', 'outros']).notNullable().defaultTo('outros');
    table.date('data_fabricacao').notNullable();
    table.date('data_validade').notNullable();
    table.timestamps(true, true);

    table.foreign('instrutor_id').references('id').inTable('instrutores');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('materiais')
};
