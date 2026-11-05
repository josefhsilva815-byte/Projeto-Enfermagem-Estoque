import DB from "../database/configDB.js";
import searchItemInAllTables from "./searchItemInAllTables.js";

async function recordUsage(id, newAmount) {
    try {
        const { table, item } = await searchItemInAllTables(id) ?? { table: undefined, item: undefined };

        if (!table) throw new Error(`Item <${id}> não encontrado!`);
        if (!(Number(newAmount) >= 0)) throw new Error("Quantidade precisa ser um número");
        if (Number(newAmount) <= 0 || Number(newAmount) > item.quantidade) {
            throw new Error("A quantidade não pode ser menor ou igual a zero e nem maior que a do estoque!");
        }

        const quantidade = Number(item.quantidade) - Number(newAmount);

        const newRegister = {
            id: item.id,
            instrutor_id: item.instrutor_id,
            nome: item.nome,
            quantidade,
            descricao: item.descricao,
            categoria: item.categoria,
            data_fabricacao: item.data_fabricacao,
            data_validade: item.data_validade,
        }

        return await DB(table.name).where('id', '=', item.id).update(newRegister);
    } catch (error) {
        throw new Error(error.message)
    }
}

/* Teste
await recordUsage('7a177667-49b8-402d-82ff-9fbfcdb69c41', 100);
*/

export default recordUsage;