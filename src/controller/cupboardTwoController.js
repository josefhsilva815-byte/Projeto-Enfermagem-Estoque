import CupboardRepository from "../repository/CupboardRepository.js";

const cupboardRepository = new CupboardRepository('armario_2');

// Create
export async function newItem(req, reply) {
    try {
        const {
            instrutor_id,
            nome,
            quantidade,
            descricao,
            categoria,
            data_fabricacao,
            data_validade
        } = req.body;
        await cupboardRepository.createItem({
            instrutor_id,
            nome,
            quantidade,
            descricao,
            categoria,
            data_fabricacao,
            data_validade
        });
        return reply.code(200).send("Item cadastrado com sucesso!");
    } catch (error) {
        return reply.code(400).send({ message: "CREATE INSTRUCTOR", error: error.message })
    }
}

// Read
export async function getAllItems(req, reply) {
    try {
        const data = await cupboardRepository.listAll();
        return reply.code(200).send(data)
    } catch (error) {
        return reply.code(400).send({ message: "GET ALL ITEMS", error: error.message })
    }
}
export async function getItemsByQuantidadeDesc(req, reply) {
    try {
        const data = await cupboardRepository.listByQuantidadeDesc();
        return reply.code(200).send(data)
    } catch (error) {
        return reply.code(400).send({ message: "GET ALL BY AMOUNT DESC", error: error.message })
    }
}
export async function getItemsByQuantidadeAsc(req, reply) {
    try {
        const data = await cupboardRepository.listByQuantidadeAsc();
        return reply.code(200).send(data)
    } catch (error) {
        return reply.code(400).send({ message: "GET ALL BY AMOUNT ASC", error: error.message })
    }
}
export async function getItemById(req, reply) {
    try {
        const { id } = req.params;
        const item = await cupboardRepository.listById(id);
        return reply.code(200).send(item);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM BY ID", error: error.message })
    }
}
export async function getItemsByName(req, reply) {
    try {
        const { nome } = req.params;
        const item = await cupboardRepository.listByName(nome);
        return reply.code(200).send(item);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM BY NAME", error: error.message })
    }
}
export async function getItemsByCategory(req, reply) {
    try {
        const { category } = req.params;
        const item = await cupboardRepository.listByCategory(category);
        return reply.code(200).send(item);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM BY CATEGORY", error: error.message })
    }
}
export async function getItemsExpired(req, reply) {
    try {
        const item = await cupboardRepository.listExpired();
        return reply.code(200).send(item);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM EXPIRED", error: error.message })
    }
}
export async function getItemByInstrutorId(req, reply) {
    try {
        const { id } = req.params;
        const item = await cupboardRepository.listByInstrutorId(id);
        return reply.code(200).send(item);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM BY INSTRUCTOR ID", error: error.message })
    }
}

// Update
export async function updItem(req, reply) {
    try {
        const { id } = req.params;
        const {
            instrutor_id,
            nome,
            quantidade,
            descricao,
            categoria,
            data_fabricacao,
            data_validade
        } = req.body;

        await cupboardRepository.updateItem(id, {
            instrutor_id,
            nome,
            quantidade,
            descricao,
            categoria,
            data_fabricacao,
            data_validade
        });
        return reply.code(200).send("Item atualizado com sucesso!");
    } catch (error) {
        return reply.code(400).send({ message: "UPDATE ITEM", error: error.message })
    }
}

// Delete
export async function delItem(req, reply) {
    try {
        const { id } = req.params;
        await cupboardRepository.deleteItem(id);
        return reply.code(200).send("Item excluído com sucesso!");
    } catch (error) {
        return reply.code(400).send({ message: "DELETE ITEM", error: error.message })
    }
}