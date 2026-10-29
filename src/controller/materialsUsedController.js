import MaterialsUsedRepository from "../repository/MaterialsUsedRepository.js";

const materialsUsedRepository = new MaterialsUsedRepository();

// POST
export async function newItemUsed(req, reply) {
    try {
        const {
            instrutor_id,
            item_id,
            quantidade,
            disciplina,
            observacao,
            turma,
            turno
        } = req.body;
        await materialsUsedRepository.createItem({
            instrutor_id,
            item_id,
            quantidade,
            disciplina,
            observacao,
            turma,
            turno
        });
        return reply.code(200).send("Item cadastrado com sucesso!");
    } catch (error) {
        return reply.code(400).send({ message: "CREATE ITEM USED", error: error.message })
    }
}

// GET
export async function getAllItemsUsed(req, reply) {
    try {
        const itemUsed = await materialsUsedRepository.listAll();
        return reply.code(200).send(itemUsed);
    } catch (error) {
        return reply.code(400).send({ message: "GET ALL ITEMS USED", error: error.message })
    }
}
export async function getItemUsedById(req, reply) {
    try {
        const { id } = req.params;
        const itemUsed = await materialsUsedRepository.listById(id);
        return reply.code(200).send(itemUsed);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM USED BY ID", error: error.message })
    }
}
export async function getItemUsedByItemId(req, reply) {
    try {
        const { id } = req.params;
        const itemUsed = await materialsUsedRepository.listByItemId(id);
        return reply.code(200).send(itemUsed);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM USED BY ITEM ID", error: error.message })
    }
}
export async function getItemUsedByInstructorId(req, reply) {
    try {
        const { id } = req.params;
        const itemUsed = await materialsUsedRepository.listByInstructorId(id);
        return reply.code(200).send(itemUsed);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM USED BY INSTRUCTOR ID", error: error.message })
    }
}
export async function getItemUsedByShift(req, reply) {
    try {
        const { turno } = req.params;
        const itemUsed = await materialsUsedRepository.listByShift(turno);
        return reply.code(200).send(itemUsed);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM USED BY SHIFT", error: error.message })
    }
}
export async function getItemUsedByDiscipline(req, reply) {
    try {
        const { disciplina } = req.params;
        const itemUsed = await materialsUsedRepository.listByDiscipline(disciplina);
        return reply.code(200).send(itemUsed);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM USED BY DISCIPLINE", error: error.message })
    }
}
export async function getItemUsedByClass(req, reply) {
    try {
        const { turma } = req.params;
        const itemUsed = await materialsUsedRepository.listByClass(turma);
        return reply.code(200).send(itemUsed);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM USED BY DISCIPLINE", error: error.message })
    }
}
export async function getItemUsedBetween(req, reply) {
    try {
        const { de, ate } = req.body;
        const itemUsed = await materialsUsedRepository.listBetween(de, ate);
        return reply.code(200).send(itemUsed);
    } catch (error) {
        return reply.code(400).send({ message: "GET ITEM USED BETWEEN DATES", error: error.message })
    }
}

// UPDATE
export async function updItemUsed(req, reply) {
    try {
        const { id } = req.params;
        const { quantidade, observacao, turno } = req.body
        await materialsUsedRepository.updateItemUsed(id, { quantidade, observacao, turno });
        return reply.code(200).send("Item atualizado com sucesso!");
    } catch (error) {
        return reply.code(400).send({ message: "UPDATE ITEM USED", error: error.message })
    }
}

// DELETE
export async function delItemUsed(req, reply) {
    try {
        const { id } = req.params;
        await materialsUsedRepository.deleteItemUsed(id);
        return reply.code(200).send("Item excluído com sucesso!")
    } catch (error) {
        return reply.code(400).send({ message: "DELETE ITEM USED", error: error.message })
    }
}