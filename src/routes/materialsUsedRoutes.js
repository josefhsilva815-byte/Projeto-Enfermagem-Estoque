import {
    newItemUsed,
    getAllItemsUsed,
    getItemUsedById,
    getItemUsedByItemId,
    getItemUsedByInstructorId,
    getItemUsedByShift,
    getItemUsedByDiscipline,
    getItemUsedByClass,
    getItemUsedBetween,
    updItemUsed,
    delItemUsed
} from "../controller/materialsUsedController.js";

/**
 * Encapsulando as rotas
 * @param {FastifyInstance} fastify Instância de Encapsulada do Fastify
 * @param {Object} options plugin options
 */

async function materialsUsedRoutes(fastify, options) {
    // POST
    fastify.post('/materials_used', (req, reply) => newItemUsed(req, reply));

    // GET
    fastify.get('/materials_used', (req, reply) => getAllItemsUsed(req, reply));
    fastify.get('/materials_used/id/:id', (req, reply) => getItemUsedById(req, reply));
    fastify.get('/materials_used/item_id/:id', (req, reply) => getItemUsedByItemId(req, reply));
    fastify.get('/materials_used/instructor_id/:id', (req, reply) => getItemUsedByInstructorId(req, reply));
    fastify.get('/materials_used/shift/:turno', (req, reply) => getItemUsedByShift(req, reply));
    fastify.get('/materials_used/discipline/:discipline', (req, reply) => getItemUsedByDiscipline(req, reply));
    fastify.get('/materials_used/class/:turma', (req, reply) => getItemUsedByClass(req, reply));
    fastify.get('/materials_used/between', (req, reply) => getItemUsedBetween(req, reply));

    // UPDATE

    fastify.put('material_used/update/:id', (req, reply) => updItemUsed(req, reply))

    // DELETE
    fastify.delete('materials_used/delete/:id', (req, reply) => delItemUsed(req, reply))
}

export default materialsUsedRoutes;