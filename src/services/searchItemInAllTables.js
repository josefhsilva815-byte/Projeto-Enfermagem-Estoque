import DB from "../database/configDB.js";
/**
 * Buscar item em todas as tabelas
 * @param id Recebe um UUID - xxxx-xxxx-xxxx-xxxx-xxxx
 * @returns Object { table, item }
 * - table: Tabela onde o item foi encontrado
 * - item: Item encontrado
 */

async function searchItemInAllTables(id = "") {
    try {
        const cupboardTables = await DB('sqlite_master') // Busca todas as tabela
            .whereLike('name', 'armario%') // Seleciona só as que tem armario no nome
            .select('name'); // Pega só o nome da tabela

        const tablePromises = cupboardTables.map(table => {
            return DB(table.name).select("*").where({ id }).first() // Retorna a função de busca em cada tabela com o ID informado
        });

        const itemsLocalized = await Promise.all(tablePromises); // Espera todas as buscas serem finalizadas e retorna o resultado de cada uma 
        const objItems = { ...itemsLocalized }; // Transforma o array em um objeto { index: campo };

        const result = Object.keys(objItems) // Cria um array com as propriedades do objeto "objItems";
            .map(item => {
                return { // Retorna um objeto com a Tabela e o Item encontrados
                    table: cupboardTables[item],
                    item: objItems[item]
                }
            })
            .filter(({ item }) => item)[0]; // Filtra somente os elementos que tiverem algum valor em "item" e retorna o primeiro elemento

        return result || { table: undefined, item: undefined };
    } catch (error) {
        throw new Error({ message: "SEARCH ITEM IN ALL TABLES", error })
    }
}

/*
>>> TESTE <<<:
console.log(await searchItemInAllTables('2b80efcc-b121-4bf7-a2ab-1c2fa92964a0'));
*/

export default searchItemInAllTables;