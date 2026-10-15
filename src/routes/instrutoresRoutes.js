import {
    newInstructor,
    getAllInstructors,
    getAllInstructorsOrderAsc,
    getAllInstructorsOrderDesc,
    updInstructor,
    delInstructor,
    getInstructorById,
    getInstructorByName,
    getInstructorByEmail
} from "../controller/instructorsController.js";

/**
 * Encapsulando as rotas
 * @param {FastifyInstance} fastify Instância de Encapsulada do Fastify
 * @param {Object} options plugin options
 */


async function instrutoresRoutes(fastify, options) {
    // POST   (C)
    fastify.post('/instructors', (req, reply) => newInstructor(req, reply));

    // GET    (R)
    fastify.get('/instructors', (req, reply) => getAllInstructors(req, reply));
    fastify.get('/instructors/order/asc', (req, reply) => getAllInstructorsOrderAsc(req, reply));
    fastify.get('/instructors/order/desc', (req, reply) => getAllInstructorsOrderDesc(req, reply));
    fastify.get('/instructors/id/:id', (req, reply) => getInstructorById(req, reply));
    fastify.get('/instructors/name/:name', (req, reply) => getInstructorByName(req, reply));
    fastify.get('/instructors/email/:email', (req, reply) => getInstructorByEmail(req, reply));

    // UPDATE (U)
    fastify.put('/instructors/update/:id', (req, reply) => updInstructor(req, reply));

    // DELETE (D)
    fastify.delete('/instructors/delete/:id', (req, reply) => delInstructor(req, reply));
}

export default instrutoresRoutes;