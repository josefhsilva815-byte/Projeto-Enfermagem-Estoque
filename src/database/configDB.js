import knex from "knex";
import Config from "../../knexfile.js";

export const dataBase = knex(Config.development);

dataBase
.raw("SELECT 1")
.then(() => {
    console.log("✅ Conexão com o banco de dados estabelecidade com sucesso!");
})
.catch((error) => {
    console.error("❌ Erro ao tentar estabelecer a conexão com o banco de dados", error.message);
})