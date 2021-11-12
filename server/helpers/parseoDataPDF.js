
const filterAreasByLengthOfInd = (areas) => { // filtrar areas por longitud de indicadores. 
    let areasMenoresA_11_Ind = [];
    let areasMayorA_12_Ind = [];

    for (let area of areas) {
        area.indicadores.length <= 11
            ? areasMenoresA_11_Ind.push(area)
            : areasMayorA_12_Ind.push(area)
    }

    const indicadorMenor = areasMenoresA_11_Ind.find(area => area.indicadores.length <= 5);
    return { areasMenoresA_11_Ind, indicadorMenor: !indicadorMenor ? '' : indicadorMenor, areasMayorA_12_Ind };
}


const transformarDataClient = ({ indicadoresByArea, literalesEspecialistas, momento, descripAndDate, studentSelected, personalFirmas }) => {  // palabra <Ind> es indicadores.
    let dataToGeneratePdf = {
        infoStudent_Docente: studentSelected, //docente, (nombres 'alumno'), seccion, grado.
        personalFirmas, // Director(a) - Coordinador(a).
        momento,
        descripAndDate, // SerYConvivir, año, inicio y fin del momento escolar. 
        indHojaPrincipal: [[], []], //si el pdf solo tiene matematica, leng-literatura y exp.cientifico, se usan ambos arrays, sino el primero.  
        tresIndByHoja_1: [],  // array de 3 areas! los indicadores por area son menores o igual a 11! 
        tresIndByHoja_2: [],  // array de 3 areas! los indicadores por area son menores o igual a 11! 
        dosIndLargosByHoja_1: [],    // array de 2 areas! los indicadores por area son mayores o igual a 12! 
        dosIndLargosByHoja_2: [],   // array de 2 areas! los indicadores por area son mayores o igual a 12! 
        dosIndLargosByHoja_3: [],   // array de 2 areas! los indicadores por area son mayores o igual a 12! 
        indEspecialistas_1: [],    // array de 5 areas, indicadores de especialistas
        indEspecialistas_2: []  // en caso de haber más de 5 areas de especialistas se usa este array.
    }
    // si solo hay tres areas Y la suma de sus indicadores NO pasa de 28, hacer que las tres areas esten en la primera hoja.
    let countInd = 0;
    let conditionMax28Ind = 28;
    const comprobacion = indicadoresByArea.length === 3;
    if (comprobacion) for (let item of indicadoresByArea) countInd += item.indicadores.length; // sumando los indicadores por area.

    if (comprobacion && countInd <= conditionMax28Ind) {
        const hojaPrincipal = dataToGeneratePdf.indHojaPrincipal;
        for (let area of indicadoresByArea) {
            area.indicadores.length > 3 && hojaPrincipal[0].length < 2
                ? hojaPrincipal[0].push(area)
                : hojaPrincipal[1].push(area)
        }

    } else {
        const { indicadorMenor, areasMenoresA_11_Ind, areasMayorA_12_Ind } = filterAreasByLengthOfInd(indicadoresByArea);
        const existIndicadorMenor = indicadorMenor !== '';

        // Inicio ------ Primer bucle, areas menores o igual a 11 indicadores. 
        if (existIndicadorMenor) { // el indicador más corto siempre queda al final de la ultima hoja de (tresIndByHoja).
            areasMenoresA_11_Ind.length > 3
                ? dataToGeneratePdf.tresIndByHoja_2.push(indicadorMenor)
                : dataToGeneratePdf.tresIndByHoja_1.push(indicadorMenor)
        }

        const indicadoresMenores = existIndicadorMenor
            ? areasMenoresA_11_Ind.filter(area => area.indicadores.length >= 6)
            : areasMenoresA_11_Ind;

        for (let area of indicadoresMenores) {
            dataToGeneratePdf.tresIndByHoja_1.length < 3
                ? dataToGeneratePdf.tresIndByHoja_1.unshift(area)
                : dataToGeneratePdf.tresIndByHoja_2.unshift(area)
        } // Fin  ------ Primer bucle, areas menores o igual a 11 indicadores. 

        // Inicio ------ Segundo bucle, areas mayores o igual a 12 indicadores. 
        for (let area of areasMayorA_12_Ind) {  // ultima comprobacion, array donde sera guardado
            if (area.indicadores.length <= 15 && dataToGeneratePdf.indHojaPrincipal[0].length < 2) dataToGeneratePdf.indHojaPrincipal[0].push(area);

            else if (dataToGeneratePdf.tresIndByHoja_1.length < 2) dataToGeneratePdf.tresIndByHoja_1.push(area);

            else if (dataToGeneratePdf.tresIndByHoja_2.length > 0 && dataToGeneratePdf.tresIndByHoja_2.length < 2) {
                dataToGeneratePdf.tresIndByHoja_2.push(area);
            }
            else {
                if (dataToGeneratePdf.dosIndLargosByHoja_1.length < 2) dataToGeneratePdf.dosIndLargosByHoja_1.push(area);

                else if (dataToGeneratePdf.dosIndLargosByHoja_2.length < 2) dataToGeneratePdf.dosIndLargosByHoja_2.push(area);

                else dataToGeneratePdf.dosIndLargosByHoja_3.push(area);
            }
        }
    }

    for (const area of literalesEspecialistas) {
        dataToGeneratePdf.indEspecialistas_1.length < 5
            ? dataToGeneratePdf.indEspecialistas_1.push(area)
            : dataToGeneratePdf.indEspecialistas_2.push(area) //en caso de haber más de 5 areas de especialistas se usa este array.
    }

    return dataToGeneratePdf;
}

module.exports = {
    transformarDataClient,
}