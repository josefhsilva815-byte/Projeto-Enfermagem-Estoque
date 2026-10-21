import {
    newItem,
    getItemsExpired,
    getItemsByName,
    getItemById,
    getItemsByQuantidadeDesc,
    getItemsByQuantidadeAsc,
    getAllItems,
    getItemsByCategory,
    getItemByInstrutorId,
    updItem,
    delItem
} from "../controller/cupboardOneController.js"

/**
 * Encapsulando as rotas
 * @param {FastifyInstance} fastify Instância de Encapsulada do Fastify
 * @param {Object} options plugin options
 */

async function cupboardOneRoutes(fastify, options) {
    // POST (C)
    fastify.post('/cupboardOne', (req, reply) => newItem(req, reply));

    // GET (R)
    fastify.get('/cupboardOne', (req, reply) => getAllItems(req, reply))
    fastify.get('/cupboardOne/amount/asc', (req, reply) => getItemsByQuantidadeAsc(req, reply))
    fastify.get('/cupboardOne/amount/desc', (req, reply) => getItemsByQuantidadeDesc(req, reply))
    fastify.get('/cupboardOne/id/:id', (req, reply) => getItemById(req, reply))
    fastify.get('/cupboardOne/name/:nome', (req, reply) => getItemsByName(req, reply))
    fastify.get('/cupboardOne/category/:category', (req, reply) => getItemsByCategory(req, reply))
    fastify.get('/cupboardOne/expired', (req, reply) => getItemsExpired(req, reply))
    fastify.get('/cupboardOne/instructor/id/:id', (req, reply) => getItemByInstrutorId(req, reply))

    // UPDATE (U)
    fastify.put('/cupboardOne/update/:id', (req, reply) => updItem(req, reply));

    // DELETE (D)
    fastify.delete('/cupboardOne/delete/:id', (req, reply) => delItem(req, reply));
}

export default cupboardOneRoutes;