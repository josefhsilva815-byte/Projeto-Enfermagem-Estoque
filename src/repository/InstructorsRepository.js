import DB from "../database/configDB.js";

class InstructorsRepository {
    // POST
    async addInstrutor({ nome, email, senha }) { // Inserir item na tabela
        try {
            if (!(nome && email && senha)) {
                throw new Error('Algum valor está vazio!');
            };
            const newInstrutor = await DB('instrutores').insert({
                nome,
                email,
                senha
            });
            return newInstrutor
        } catch (error) {
            throw new Error(error);
        }
    }

    // GET
    async listAll() {
        return await DB('instrutores');
    }
    async listAllInOrderAsc() {
        const instrutores = await DB('instrutores');
        return instrutores.toSorted((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    }
    async listAllInOrderDesc() {
        const instrutores = await DB('instrutores');
        return instrutores.toSorted((a, b) => b.nome.localeCompare(a.nome, 'pt-BR'));
    }
    async searchById(id) {
        try {
            const instrutor = await DB('instrutores').where({ id }).first();
            if (!instrutor) throw new Error('Instrutor não encontrado!');
            return instrutor
        } catch (error) {
            throw new Error(error);
        }
    }
    async searchByName(nome) {
        try {
            return await DB('instrutores').where('nome', 'like', `${nome}%`);
        } catch (error) {
            throw new Error(error);
        }
    }
    async searchByEmail(email) {
        try {
            return await DB('instrutores').where('email', 'like', `${email}%`);
        } catch (error) {
            throw new Error(error);
        }
    }

    // UPDATE
    async updateInstructor(id, data) {
        try {
            const [instrutor] = DB('instrutores').where({ id });
            if (!instrutor) throw new Error('Instrutor não encontrado!');
            const updateInstrutor = {
                nome: data.nome ?? instrutor.nome,
                email: data.email ?? instrutor.email,
                senha: data.senha ?? instrutor.senha
            };
            return await DB('instrutores').where({ id }).update(updateInstrutor);
        } catch (error) {
            throw new Error(error);
        }
    }

    // DELETE
    async deleteInstructor(id) {
        try {
            const instrutor = DB('instrutores').where({ id }).first();
            if (!instrutor) throw new Error('Instrutor não encontrado!');
            return await DB('instrutores').where({ id }).delete();
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default InstructorsRepository;