/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    const today = () => {
        return new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            dateStyle: 'short',
            timeStyle: 'medium'
        })
    }
    return knex.schema.createTable('materiais_utilizados', (table) => {
        table.increments('id').unsigned().primary();
        table.integer('instrutor_id').notNullable();
        table.integer('item_id').notNullable();
        table.integer('quantidade').notNullable();
        table.string('disciplina').notNullable();
        table.text('observacao').defaultTo('vazio');
        table.string('turma').notNullable();
        table.enu('turno', ['manha', 'tarde', 'noite']).notNullable();
        table.timestamp('criado_em').defaultTo(today());

        table.foreign('instrutor_id').references('id').inTable('instrutores');
        table.foreign('item_id').references('id').inTable('armario_1');
        table.foreign('item_id').references('id').inTable('armario_2');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('materiais_utilizados')
};
