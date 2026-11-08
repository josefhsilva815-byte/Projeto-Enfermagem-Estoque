function today() {
    const dateString = new Date().toLocaleString('pt-BR', {
        timeZone: "America/Sao_Paulo"
    }) + ".000Z"
    return new Date(dateString);
};

function formatDate(date = '') {
    const [ano, mes, dia] = date.split(/[-/]/).toReversed();
    return `${ano}-${mes}-${dia ? dia : "01"}`;
};

export { today, formatDate };