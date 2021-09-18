
let especialistas = [ 
    {area: 'COMPUTACIÓN', indicador: ` El estudiante a través del aprovechamiento de las tecnologías de la información y comunicación, utilizó el programa Microsoft Office Word, elaborando con constancia y responsabilidad cada una de las partes de su primer folleto informativo y explorando las herramientas básicas impartidas del programa como: dar formato a los textos (tipo de letra, tamaño, color, uso de negrita, cursiva y subrayado), dar formato a los párrafos (interlineado, alineación, uso de viñetas y numeración), insertar WordArt, imágenes, entre descHojaLiterals, al mismo tiempo que investigaba y desarrollaba el tema de su preferencia; favoreciendo y potenciando sus habilidades en cuanto al uso positivo y educativo de dispositivos tecnológicos (computador, tablet o teléfono inteligente). ¡Excelente trabajo mi niño! Has manifestado y demostrado tu dedicación y constancia en el cumplimiento de esta especialidad.`},
    { area: 'INGLÉS', indicador: ` El estudiante logró alcanzar en su totalidad las competencias del área de formación inglés en este segundo momento, demostró manejo adecuado en el referente n° 1 (FAMILY) “la familia” estudiando el vocabulario y pronunciación de cada uno de sus miembros en inglés, usó correctamente el tema n° 2 (WHO IS WHO/ ¿QUIEN ES QUIEN?), adivinanzas con preguntas relacionadas a los miembros de la familia; así mismo reconoce los nombres de los problemas de salud más comunes en inglés (HEALTH PROBLEMS) usando los verbos “HAVE= TENER Y FEEL= SENTIR” para expresar su estados de salud; del mismo modo hizo uso notable del vocabulario relacionado con las estaciones del año en inglés (SEASONS) con un desempeño sobresaliente en la adquisición del idioma en estos temas. El acompañamiento de los padres ha sido fundamental en este proceso de educación a distancia para la entrega responsable de todas actividades y orientación de las mismas.` 
    },
    { area: 'MÚSICA', indicador: `El estudiante durante el segundo momento realizó de manera óptima las actividades planificadas en el área de música, reconociendo cualidades importantes de la música como: el sonido, melodía, ritmo, y lenguaje musical; adicionalmente identifica la estructura de un compás y sus tipos, de igual manera reconoce personajes musicales venezolanos como Aldemaro Romero, mostrando interés en cumplir con todas las actividades asignadas a distancia.` },

    {area: 'FRANCÉS' , indicador: ` Durante el segundo momento el estudiante logró alcanzar en su totalidad las competencias requeridas por la especialidad, identificando el vocabulario de las frutas y las legumbres en francés, mediante ejercicios de completación realizo conversaciones con saludos y despedidas así como también mediante actividades lúdicas identifico profesiones u oficios, expresando su deseo en el futuro, con ayuda de recortes logro expresar de manera escrita la descripción física de personas, cumpliendo en su totalidad con las actividades de refuerzo de los contenidos trabajados.`
    },
      
    {area: 'FRANCÉS' , indicador: ` Durante el segundo momento el estudiante logró alcanzar en su totalidad las competencias requeridas por la especialidad, identificando el vocabulario de las frutas y las legumbres en francés, mediante ejercicios de completación realizo conversaciones con saludos y despedidas así como también mediante actividades lúdicas identifico profesiones u oficios, expresando su deseo en el futuro, con ayuda de recortes logro expresar de manera escrita la descripción física de personas, cumpliendo en su totalidad con las actividades de refuerzo de los contenidos trabajados.`
    },
    {area: 'EDUCACIÓN FÍSICA, DEPORTE Y RECREACIÓN' , indicador: `Realizó el trabajo del fútbol, cumpliendo con todas las pautas indicadas, además aplicó sus habilidades con ejercicios sencillos de pase, recepción y conducción. `},
]

let serYConvivir = `Durante el desarrollo del segundo momento a través del plan de atención a distancia, se  evidenció; que el estudiante fue responsable, entusiasta, constante y dedicado. Cumplió; con el compromiso esperado, las prácticas se evidenciaron de una manera adecuada, cualquier percance para hacer llegar las actividades lo manifestó por audio. En el proceso lógico matemático demostró; habilidad en operaciones básicas tales como: adición, sustracción y división de números naturales y decimales`;



const transformarDataClient = (values) => {  // palabra clave <ind> es indicadores
    
    let dataToGeneratePdf = {
        infoStudent_Docente: {}, // el objecto studentSelected, tiene, docente, nombres 'alumno', textArea, seccion, grado.
        directora: '',
        coordinadora: '',
        momento: '',
        fechaInicio: '',           // inicio fecha del momento escolar.
        fechaFin: '',          // fin fecha del momento escolar.
        anioEscolar: '',             // anio escolar membrete, ejemplo => 2021-2022
        indHojaPrincipal: [],            // array de 2 objectos! la longitud de los indicadores no debe ser mayor a 15. 
        indTresByHoja_1: [],             // array de 3 objectos! la longitud de los indicadores no debe ser mayor a 11! 
        indTresByHoja_2: [],               // array de 3 objectos! la longitud de los indicadores no debe ser mayor a 11! 
        indDosLargosByHoja_1: [],           // array de 2 objectos largos! la longitud de los indicadores no debe ser mayor a 15! 
        indDosLargosByHoja_2: [],           // array de 2 objectos largos! la longitud de los indicadores no debe ser mayor a 15! 
        indDosLargosByHoja_3: [],           // array de 2 objectos largos! la longitud de los indicadores no debe ser mayor a 15! 
        indEspecialistas_1: [],             // array de 5 areas, indicadores de especialistas
        indEspecialistas_2: []
    }




}





module.exports = {
    transformarDataClient,
    especialistas,
    serYConvivir,
}