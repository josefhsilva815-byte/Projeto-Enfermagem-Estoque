/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('materiais_utilizados', (table) => {
        table.increments('id').unsigned().primary();
        table.integer('instrutor_id').notNullable();
        table.integer('item_id').notNullable();
        table.integer('quantidade').notNullable();
        table.string('disciplina').notNullable();
        table.text('observacao').notNullable().defaultTo('vazio');
        table.string('turma').notNullable();
        table.enu('turno', ['manha', 'tarde', 'noite']).notNullable();
        table.timestamp('data_criacao').defaultTo(knex.fn.now());

        table.foreign('instrutor_id').references('id').inTable('instrutores');
        table.foreign('item_id').references('id').inTable('materiais');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('materiais_utilizados')
};
