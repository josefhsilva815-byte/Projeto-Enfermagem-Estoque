import DB from "../database/configDB.js";

function formatDate(date = '') {
    const [ano, mes, dia] = date.split(/[-/]/).toReversed();
    return `${ano}-${mes}-${dia ? dia : "01"}`;
}

class CupboardRepository {
    constructor(table) {
        this.table = table
    }
    // POST
    async createItem({
        instrutor_id,
        nome,
        quantidade,
        descricao,
        categoria,
        data_fabricacao,
        data_validade
    }) {
        try {
            const instrutor = await DB('instrutores').where('id', '=', instrutor_id).first();
            if (!instrutor) throw new Error('Instrutor não cadastrado no sistema!');
            if (!(instrutor_id && nome && quantidade && descricao && categoria && data_fabricacao && data_validade)) {
                throw new Error('Algum valor está vazio!');
            };
            if (Number(quantidade) <= 0) throw new Error('Quantidade não pode ser menor ou igual a zero!');

            const newItem = await DB(this.table).insert({
                instrutor_id,
                nome,
                quantidade,
                descricao: descricao.trim(),
                categoria,
                data_fabricacao: formatDate(data_fabricacao),
                data_validade: formatDate(data_validade)
            });

            return newItem;
        } catch (error) {
            throw new Error(error);
        }
    }

    // GET
    async listAll() {
        try {
            return await DB(this.table)
                .join('instrutores', `${this.table}.instrutor_id`, '=', 'instrutores.id')
                .select(
                    { id: `${this.table}.id` },
                    { instrutor: 'instrutores.nome' },
                    { nome: `${this.table}.nome` },
                    { quantidade: `${this.table}.quantidade` },
                    { descricao: `${this.table}.descricao` },
                    { categoria: `${this.table}.categoria` },
                    { data_fabricacao: `${this.table}.data_fabricacao` },
                    { data_validade: `${this.table}.data_validade` }
                );
        } catch (error) {
            throw new Error(error);
        }
    }
    async listByQuantidadeDesc() {
        try {
            return DB(this.table).orderBy('quantidade', 'desc');
        } catch (error) {
            throw new Error(error);
        }
    }
    async listByQuantidadeAsc() {
        try {
            return DB(this.table).orderBy('quantidade', 'asc');
        } catch (error) {
            throw new Error(error);
        }
    }
    async listById(id) {
        try {
            const item = await DB(this.table).where({ id }).first();
            if (!item) throw new Error('Item não encontrado!');
            return item;
        } catch (error) {
            throw new Error(error);
        }
    }
    async listByName(nome) {
        try {
            return await DB(this.table).where('nome', 'like', `${nome}%`);
        } catch (error) {
            throw new Error(error);
        }
    }
    async listByCategory(categoria) {
        try {
            return await DB(this.table).where({ categoria });
        } catch (error) {
            throw new Error(error);
        }
    }
    async listExpired() {
        try {
            return await DB(this.table).where('data_validade', '<', new Date().toISOString().split("T")[0]);
        } catch (error) {
            throw new Error(error);
        }
    }
    async listByInstrutorId(instrutor_id) {
        try {
            return await DB(this.table).where({ instrutor_id });
        } catch (error) {
            throw new Error(error);
        }
    }

    // UPDATE
    async updateItem(id, data) {
        try {
            const item = await DB(this.table).where({ id }).first();
            if (!item) throw new Error('Item não encontrado!');
            if (Number(data.quantidade) <= 0) throw new Error('Quantidade não pode ser menor ou igual a zero!');

            const newItem = {
                instrutor_id: item.instrutor_id,
                nome: item.nome,
                quantidade: data.quantidade ?? item.quantidade,
                descricao: data.descricao ?? item.descricao,
                categoria: item.categoria,
                data_fabricacao: item.data_fabricacao,
                data_validade: formatDate(data.data_validade) ?? item.data_validade
            }
            return await DB(this.table).where({ id }).update(newItem)
        } catch (error) {
            throw new Error(error);
        }
    }

    // DELETE
    async deleteItem(id) {
        try {
            const item = await DB(this.table).where({ id }).first();
            if (!item) throw new Error('Item não encontrado!');
            return await DB(this.table).where({ id }).delete();
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default CupboardRepository;