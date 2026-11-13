import CupboardRepository from "../repository/CupboardRepository.js";
import searchItemInAllTables from "./searchItemInAllTables.js";

async function recordUsage(id, newAmount) {
    try {
        const { table, item } = await searchItemInAllTables(id);
        if (!table) throw new Error(`Item <${id}> não encontrado!`);
        if (!Number.isInteger(newAmount) || Number(newAmount) > item.quantidade || Number(newAmount) <= 0) {
            throw new Error("A quantidade não pode ser menor ou igual a zero e nem maior que a do estoque!");
        }

        const cupboardRepository = new CupboardRepository(table);
        const quantidade = Number(item.quantidade) - Number(newAmount);
        return await cupboardRepository.updateItem(item.id, { quantidade });
    } catch (error) {
        throw new Error(error.message)
    }
}

/* Teste
await recordUsage('7a177667-49b8-402d-82ff-9fbfcdb69c41', 100);
*/

export default recordUsage;