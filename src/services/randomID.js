const randomID = async () => {
    let id = crypto.randomUUID();
    const { item } = await searchItemInAllTables(id);
    if (item) randomID();
    return id
}

export default randomID;