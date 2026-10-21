import Fastify from "fastify";
import DB from "./src/database/configDB.js";
import instrutoresRoutes from "./src/routes/instrutoresRoutes.js";
import cupboardOneRoutes from "./src/routes/cupboardOneRoutes.js";
import cupboardTwoRoutes from "./src/routes/cupboardTwoRoutes.js";
import materiaisUtilizadosRoutes from "./src/routes/materiaisUtilizadosRoutes.js";

/**
 * @type {import('fastify').FastifyInstance} Instância do Fastify
 */


const fastify = Fastify({
    logger: true
});

fastify.register(instrutoresRoutes);
fastify.register(cupboardOneRoutes);
fastify.register(cupboardTwoRoutes);
fastify.register(materiaisUtilizadosRoutes);



fastify.get("/test/:table", async (req, reply) => {
    const { table } = req.params;
    try {
        const data = await DB(`${table}`);
        reply.send(JSON.stringify(data))
    } catch (error) {
        reply.send({ "Erro": error.message })
    }
})


fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`Servidor operando no endereço ${address}`);
});