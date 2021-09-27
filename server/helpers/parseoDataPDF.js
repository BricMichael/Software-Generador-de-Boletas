
let especialistas = [
    { area: 'COMPUTACIÓN', indicador: ` El estudiante a través del aprovechamiento de las tecnologías de la información y comunicación, utilizó el programa Microsoft Office Word, elaborando con constancia y responsabilidad cada una de las partes de su primer folleto informativo y explorando las herramientas básicas impartidas del programa como: dar formato a los textos (tipo de letra, tamaño, color, uso de negrita, cursiva y subrayado), dar formato a los párrafos (interlineado, alineación, uso de viñetas y numeración), insertar WordArt, imágenes, entre descHojaLiterals, al mismo tiempo que investigaba y desarrollaba el tema de su preferencia; favoreciendo y potenciando sus habilidades en cuanto al uso positivo y educativo de dispositivos tecnológicos (computador, tablet o teléfono inteligente). ¡Excelente trabajo mi niño! Has manifestado y demostrado tu dedicación y constancia en el cumplimiento de esta especialidad.` },
    {
        area: 'INGLÉS', indicador: ` El estudiante logró alcanzar en su totalidad las competencias del área de formación inglés en este segundo momento, demostró manejo adecuado en el referente n° 1 (FAMILY) “la familia” estudiando el vocabulario y pronunciación de cada uno de sus miembros en inglés, usó correctamente el tema n° 2 (WHO IS WHO/ ¿QUIEN ES QUIEN?), adivinanzas con preguntas relacionadas a los miembros de la familia; así mismo reconoce los nombres de los problemas de salud más comunes en inglés (HEALTH PROBLEMS) usando los verbos “HAVE= TENER Y FEEL= SENTIR” para expresar su estados de salud; del mismo modo hizo uso notable del vocabulario relacionado con las estaciones del año en inglés (SEASONS) con un desempeño sobresaliente en la adquisición del idioma en estos temas. El acompañamiento de los padres ha sido fundamental en este proceso de educación a distancia para la entrega responsable de todas actividades y orientación de las mismas.`
    },
    {
        area: 'INGLÉS', indicador: ` El estudiante logró alcanzar en su totalidad las competencias del área de formación inglés en este segundo momento, demostró manejo adecuado en el referente n° 1 (FAMILY) “la familia” estudiando el vocabulario y pronunciación de cada uno de sus miembros en inglés, usó correctamente el tema n° 2 (WHO IS WHO/ ¿QUIEN ES QUIEN?), adivinanzas con preguntas relacionadas a los miembros de la familia; así mismo reconoce los nombres de los problemas de salud más comunes en inglés (HEALTH PROBLEMS) usando los verbos “HAVE= TENER Y FEEL= SENTIR” para expresar su estados de salud; del mismo modo hizo uso notable del vocabulario relacionado con las estaciones del año en inglés (SEASONS) con un desempeño sobresaliente en la adquisición del idioma en estos temas. El acompañamiento de los padres ha sido fundamental en este proceso de educación a distancia para la entrega responsable de todas actividades y orientación de las mismas.`
    },
    { area: 'MÚSICA', indicador: `El estudiante durante el segundo momento realizó de manera óptima las actividades planificadas en el área de música, reconociendo cualidades importantes de la música como: el sonido, melodía, ritmo, y lenguaje musical; adicionalmente identifica la estructura de un compás y sus tipos, de igual manera reconoce personajes musicales venezolanos como Aldemaro Romero, mostrando interés en cumplir con todas las actividades asignadas a distancia.` },

    {
        area: 'FRANCÉS', indicador: ` Durante el segundo momento el estudiante logró alcanzar en su totalidad las competencias requeridas por la especialidad, identificando el vocabulario de las frutas y las legumbres en francés, mediante ejercicios de completación realizo conversaciones con saludos y despedidas así como también mediante actividades lúdicas identifico profesiones u oficios, expresando su deseo en el futuro, con ayuda de recortes logro expresar de manera escrita la descripción física de personas, cumpliendo en su totalidad con las actividades de refuerzo de los contenidos trabajados.`
    }
]

let serYConvivir = `Durante el desarrollo del segundo momento a través del plan de atención a distancia, se  evidenció; que el estudiante fue responsable, entusiasta, constante y dedicado. Cumplió; con el compromiso esperado, las prácticas se evidenciaron de una manera adecuada, cualquier percance para hacer llegar las actividades lo manifestó por audio. En el proceso lógico matemático demostró; habilidad en operaciones básicas tales como: adición, sustracción y división de números naturales y decimales`;


const filterIndicadoresByLongitud = (values) => {
    let indCortos = [];  // areas las cuales tengan 11 o menos indicadores
    let indMayorEqual_12 = [];  // areas las cuales tengan 12 o mas indicadores

    for (let item of values) {
        item.indicadores.length <= 11
            ? indCortos.push(item)
            : indMayorEqual_12.push(item)
    }

    const indicadorMenor = indCortos.find(item => item.indicadores.length <= 5);
    return { indCortos, indicadorMenor: !indicadorMenor ? '' : indicadorMenor, indMayorEqual_12 };
}


const transformarDataClient = ({ indicadoresByArea, literalesEspecialistas, momento, textArea, fechaBoleta, studentSelected }) => {  // palabra clave <ind> es indicadores
    let dataToGeneratePdf = {
        infoStudent_Docente: studentSelected, // studentSelected tiene, docente, nombres 'alumno', textArea, seccion, grado.
        serYConvivir: textArea,
        directora: 'Dalimilet Herrera',
        coordinadora: 'Coordinadora Nombre',
        momento,
        fechaInicio: fechaBoleta.inicioMomento.trim(),           // inicio fecha del momento escolar.
        fechaFin: fechaBoleta.finMomento.trim(),          // fin fecha del momento escolar.
        anioEscolar: fechaBoleta.anioEscolar.trim(),             // anio escolar membrete, ejemplo => 2021-2022
        indHojaPrincipal: [[], []],            // array de 2 objectos! la longitud de los indicadores no debe ser mayor a 15. 
        tresIndByHoja_1: [],             // array de 3 objectos! la longitud de los indicadores no debe ser mayor a 11! 
        tresIndByHoja_2: [],               // array de 3 objectos! la longitud de los indicadores no debe ser mayor a 11! 
        dosIndLargosByHoja_1: [],           // array de 2 objectos largos! la longitud de los indicadores no debe ser mayor a 15! 
        dosIndLargosByHoja_2: [],           // array de 2 objectos largos! la longitud de los indicadores no debe ser mayor a 15! 
        dosIndLargosByHoja_3: [],           // array de 2 objectos largos! la longitud de los indicadores no debe ser mayor a 15! 
        indEspecialistas_1: [],             // array de 5 areas, indicadores de especialistas
        indEspecialistas_2: []
    }
    // si solo hay tres areas asegurarme que la suma de sus indicadores no pase de 28 
    // y así permitir que los tres entren en la primera hoja
    let countInd = 0;
    let conditionMax28Ind = 28;
    const comprobacion = indicadoresByArea.length === 3;
    if (comprobacion) for (let item of indicadoresByArea) countInd += item.indicadores.length;

    if (comprobacion && countInd <= conditionMax28Ind) {
        const hojaPrincipal = dataToGeneratePdf.indHojaPrincipal;
        for (let item of indicadoresByArea) {
            item.indicadores.length > 3 && hojaPrincipal[0].length < 2
                ? hojaPrincipal[0].push(item)
                : hojaPrincipal[1].push(item)
        }

    } else {
        const { indCortos, indicadorMenor, indMayorEqual_12 } = filterIndicadoresByLongitud(indicadoresByArea);
        const existIndicadorMenor = indicadorMenor !== '';

        // ------------------Primer bucle reccorer el filtro de las areas <= 11 
        const indicadoresMayores = existIndicadorMenor ? indCortos.filter(item => item.indicadores.length >= 6) : indCortos;

        if (existIndicadorMenor) {
            indCortos.length > 3
                ? dataToGeneratePdf.tresIndByHoja_2.push(indicadorMenor)
                : dataToGeneratePdf.tresIndByHoja_1.push(indicadorMenor)
        }


        for (let item of indicadoresMayores) {
            dataToGeneratePdf.tresIndByHoja_1.length < 3
                ? dataToGeneratePdf.tresIndByHoja_1.unshift(item)
                : dataToGeneratePdf.tresIndByHoja_2.unshift(item)
        }
        // ------------------

        // //------------------ segundo bucle, recorer la resp del filtro cuyas areas sus indicadores sean mayor o igual a 12.
        for (let item of indMayorEqual_12) {   // ultima comprobacion, array donde sera guardado
            if (item.indicadores.length <= 15 && dataToGeneratePdf.indHojaPrincipal[0].length < 2) dataToGeneratePdf.indHojaPrincipal[0].push(item);

            else if (dataToGeneratePdf.tresIndByHoja_1.length < 2) dataToGeneratePdf.tresIndByHoja_1.push(item);

            else if (dataToGeneratePdf.tresIndByHoja_2.length > 0 && dataToGeneratePdf.tresIndByHoja_2.length < 2) {
                dataToGeneratePdf.tresIndByHoja_2.push(item);  // ultimo comprobacion, array donde sera guardado,
            } else {
                if (dataToGeneratePdf.dosIndLargosByHoja_1.length < 2) dataToGeneratePdf.dosIndLargosByHoja_1.push(item);

                else if (dataToGeneratePdf.dosIndLargosByHoja_2.length < 2) dataToGeneratePdf.dosIndLargosByHoja_2.push(item);

                else dataToGeneratePdf.dosIndLargosByHoja_3.push(item);
            }
        }
    }

    for (const item of literalesEspecialistas) {
        dataToGeneratePdf.indEspecialistas_1.length < 5
            ? dataToGeneratePdf.indEspecialistas_1.push(item)
            : dataToGeneratePdf.indEspecialistas_2.push(item)
    }


    // continua logica
    //     const { indEspecialistas_1, indEspecialistas_2, ...rest } = dataToGeneratePdf;
    //     console.log('array 1 ', indEspecialistas_1.length)
    //     console.log('array2 ', indEspecialistas_2.length)
    // console.log(dataToGeneratePdf);
    return dataToGeneratePdf;
}





module.exports = {
    transformarDataClient,
    especialistas,
    serYConvivir,
}