/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('armario_2', (table) => {
        table.string('id').primary();
        table.integer('instrutor_id').notNullable();
        table.string('nome').notNullable();
        table.integer('quantidade').notNullable();
        table.text('descricao').defaultTo('vazio');
        table.enu('categoria', ['material', 'equipamento', 'outros']).defaultTo('outros');
        table.date('data_fabricacao').notNullable();
        table.date('data_validade').defaultTo('indeterminado');
        table.timestamps(true, true);

        table.foreign('instrutor_id').references('id').inTable('instrutores');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('armario_2')
};
