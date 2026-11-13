function today() {
    const timeZone = "America/Sao_Paulo";
    const dateString = new Date().toLocaleDateString('pt-BR', { timeZone });
    const timeString = new Date().toLocaleTimeString('pt-BR', { timeZone });

    const timestamp = `${formatDate(dateString)} ${timeString}`;

    /* TESTE: 
    console.log({ dateString, timeString, timestamp: new Date(timestamp + '.000Z') });
    */
    return timestamp + '.000Z'
};

function formatDate(date) {
    if(!date) return;
    const [ano, mes, dia] = date.split(/[-/]/).toReversed();
    return `${ano}-${mes}-${dia ? dia : "01"}`;
};

export { today, formatDate };