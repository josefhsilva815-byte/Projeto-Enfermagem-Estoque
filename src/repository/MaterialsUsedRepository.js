import DB from "../database/configDB.js";

class MaterialsUsedRepository {
    // POST
    async createItem({
        instrutor_id,
        item_id,
        quantidade,
        disciplina,
        observacao,
        turma,
        turno
    }) { // Inserir item na tabela
        try {
            const itemArm1 = await DB('armario_1').where('id', '=', item_id).first();
            const itemArm2 = await DB('armario_2').where('id', '=', item_id).first();
            const instrutor = await DB('instrutores').where('id', '=', instrutor_id).first();

            if (!(instrutor_id && item_id && quantidade && disciplina && observacao && turma && turno)) {
                throw new Error('Algum valor está vazio!');
            };
            if (!instrutor) throw new Error('Instrutor não cadastrado no sistema!');
            if (!(itemArm1 || itemArm2)) throw new Error('Item não cadastrado no sitema!');
            if (Number(quantidade) <= 0) throw new Error('Quantidade não pode ser menor ou igual a zero!');

            const newItemUsed = await DB('materiais_utilizados').insert({
                instrutor_id,
                item_id,
                quantidade,
                disciplina,
                observacao,
                turma,
                turno
            });
            return newItemUsed
        } catch (error) {
            throw new Error(error);
        }
    }

    // GET
    async listAll() {
        return await DB({ items_used: 'materiais_utilizados' })
            .join('instrutores', 'items_used.instrutor_id', 'instrutores.id')
            .leftJoin('armario_1', 'items_used.item_id', 'armario_1.id')
            .leftJoin('armario_2', 'items_used.item_id', 'armario_2.id')
            .select(
                { id: 'items_used.id' },
                { instrutor: 'instrutores.nome' },
                { nome: DB.raw('COALESCE(armario_1.nome, armario_2.nome)') },
                { quantidade: 'items_used.quantidade' },
                { disciplina: 'items_used.disciplina' },
                { observacao: 'items_used.observacao' },
                { turma: 'items_used.turma' },
                { turno: 'items_used.turno' },
                { criado_em: 'items_used.criado_em' }
            );
    }
    async listById(id) {
        try {
            const itemUsed = await DB('materiais_utilizados').where({ id }).first()
            if (!itemUsed) throw new Error('Item não encontrado!');
            return itemUsed;
        } catch (error) {
            throw new Error(error);
        }
    }
    async listByItemId(item_id) {
        try {
            return await DB('materiais_utilizados').where({ item_id });
        } catch (error) {
            throw new Error(error);
        }
    }
    async listByInstructorId(id) {
        try {
            return await DB('materiais_utilizados').where('instrutor_id', '=', id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async listByShift(turno) {
        try {
            return await DB('materiais_utilizados').where({ turno });
        } catch (error) {
            throw new Error(error);
        }
    }
    async listByDiscipline(disciplina) {
        try {
            return DB('materiais_utilizados').where({ disciplina });
        } catch (error) {
            throw new Error(error);
        }
    }
    async listByClass(turma) {
        try {
            return DB('materiais_utilizados').where({ turma });
        } catch (error) {
            throw new Error(error);
        }
    }
    async listBetween(de, ate) {
        try {
            return DB('materiais_utilizados').whereBetween('criado_em', [de, ate]);
        } catch (error) {
            throw new Error(error)
        }
    }

    // UPDATE
    async updateItemUsed(id, data) {
        try {
            const item = await DB('materiais_utilizados').where({ id }).first();
            if (!item) throw new Error('Item não encontrado!');
            if (Number(data.quantidade) <= 0) throw new Error('Quantidade não pode ser menor ou igual a zero!');

            const newItemUsed = {
                instrutor_id: item.instrutor_id,
                item_id: item.item_id,
                quantidade: data.quantidade ?? item.quantidade,
                disciplina: item.disciplina,
                observacao: data.observacao ?? item.observacao,
                turma: item.turma,
                turno: data.turno ?? item.turno
            }

            return await DB('materiais_utilizados').where({ id }).update(newItemUsed);
        } catch (error) {
            throw new Error(error);
        }
    }

    // DELETE
    async deleteItemUsed(id) {
        try {
            const item = await DB('materiais_utilizados').where({ id }).first();
            if (!item) throw new Error('Item não encontrado!');
            return await DB('materiais_utilizados').where({ id }).delete();
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default MaterialsUsedRepository;