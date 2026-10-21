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
} from "../controller/cupboardTwoController.js"

/**
 * Encapsulando as rotas
 * @param {FastifyInstance} fastify Instância de Encapsulada do Fastify
 * @param {Object} options plugin options
 */

async function cupboardTwoRoutes(fastify, options) {
    // POST (C)
    fastify.post('/cupboardTwo', (req, reply) => newItem(req, reply));

    // GET (R)
    fastify.get('/cupboardTwo', (req, reply) => getAllItems(req, reply))
    fastify.get('/cupboardTwo/amount/asc', (req, reply) => getItemsByQuantidadeAsc(req, reply))
    fastify.get('/cupboardTwo/amount/desc', (req, reply) => getItemsByQuantidadeDesc(req, reply))
    fastify.get('/cupboardTwo/id/:id', (req, reply) => getItemById(req, reply))
    fastify.get('/cupboardTwo/name/:nome', (req, reply) => getItemsByName(req, reply))
    fastify.get('/cupboardTwo/category/:category', (req, reply) => getItemsByCategory(req, reply))
    fastify.get('/cupboardTwo/expired', (req, reply) => getItemsExpired(req, reply))
    fastify.get('/cupboardTwo/instructor/id/:id', (req, reply) => getItemByInstrutorId(req, reply))

    // UPDATE (U)
    fastify.put('/cupboardTwo/update/:id', (req, reply) => updItem(req, reply));

    // DELETE (D)
    fastify.delete('/cupboardTwo/delete/:id', (req, reply) => delItem(req, reply));
}

export default cupboardTwoRoutes;