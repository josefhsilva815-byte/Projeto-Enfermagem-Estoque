import Fastify from "fastify";
import cors from "@fastify/cors";
import DB from "./src/database/configDB.js";
import cupboardOneRoutes from "./src/routes/cupboardOneRoutes.js";
import cupboardTwoRoutes from "./src/routes/cupboardTwoRoutes.js";
import instructorsRoutes from "./src/routes/instructorsRoutes.js";
import materialsUsedRoutes from "./src/routes/materialsUsedRoutes.js";

/**
 * @type {import('fastify').FastifyInstance} Instância do Fastify
 */


const fastify = Fastify({
    logger: true
});

fastify.register(cors, {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
});

fastify.register(cupboardOneRoutes);
fastify.register(cupboardTwoRoutes);
fastify.register(instructorsRoutes);
fastify.register(materialsUsedRoutes);



// fastify.get("/test/:table", async (req, reply) => {
//     const { table } = req.params;
//     try {
//         const data = await DB(`${table}`);
//         reply.code(200).send(data)
//     } catch (error) {
//         reply.code(400).send({ messsage: "TEST DATABASE", error: error.message })
//     }
// })


fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`Servidor operando no endereço ${address}`);
});