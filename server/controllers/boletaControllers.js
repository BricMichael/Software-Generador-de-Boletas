const pool = require ('../configDB/poolConfig');
const puppeteer = require('puppeteer');
const pupeerReport = require('puppeteer-report');
const path = require('path');
// const { renderTemplate,createdPDF, prueba } = require('../helpers/renderTemplate');



const InitialsFiveStudents = async (req, res) => {
   try {
        const { gradoSelected, seccionSelected } = req.body;
        const respBD = await pool.query('SELECT id, nombres, grado, seccion FROM estudiante WHERE (grado = $1) and (seccion = $2) OFFSET $3 LIMIT $4', [gradoSelected, seccionSelected, 0, 5]);

        res.json(respBD.rows);
   } catch (err) {
        console.log(err.message);
   }

}

const nextFiveStudents = async (req, res) => {
     try {
          const { valorInicial, gradoSelected, seccionSelected } = req.body;
          const respBD = await pool.query('SELECT id, nombres, grado, seccion FROM estudiante WHERE (grado = $1) and (seccion = $2) OFFSET $3 LIMIT $4', [gradoSelected, seccionSelected, valorInicial, 5]);
  
          res.json(respBD.rows);
     } catch (err) {
          console.log(err.message);
     }
  
  }


const indicadorEspecialistaByArea = async (req, res) => {  
     const anio = new Date().getFullYear();
     try {
          const { grado, area, momento } = req.body;

          const respBD = await pool.query("SELECT indicador, literal FROM indicador WHERE grado = $1 and area = $2 and momento = $3 and fecha_creacion = $4", [grado, area, momento, anio]);

          res.json(respBD.rows);
     } catch (err) {
          console.log(err.message)
     }
}
   

let dataToBuildPDF = {};
const modelFinalPagePdf = (req, res) => {
     console.log(dataToBuildPDF)
     res.setHeader('Content-Type', 'text/html');
     res.render('index', dataToBuildPDF);  
 }

 let indicadores = [
     {indicador: 'Identificó de manera acorde los signos de puntuación tales como: el punto, los dos puntos, la coma, las comillas, signos de interrogación, signos de admiración.', literal: 'E'},
     {indicador: 'Comprendió y estableció comparaciones entre la silaba tónica y átona. ', literal: 'E'},
     {indicador: 'Distinguió las palabras que llevan acento ortográfico. ', literal: 'RN'},
     {indicador: 'Subrayó y utilizó eficazmente el acento prosódico.', literal: 'E'},
     {indicador: ' Con ayuda de ejemplos diferenció las reglas del hiato con la del diptongo y triptongo.', literal: 'MB'},
     {indicador: 'Maicol data dinamica hahah', literal: 'MB'},
     {indicador: 'Clasificó las palabras en agudas, graves y esdrújulas.', literal: 'E'},
     {indicador: 'Identificó apropiadamente los elementos de la oración: sujeto, verbo y predicado.', literal: 'RN'},
     {indicador: 'Por medio de imágenes reconoció y aplicó la ampliación del sujeto.', literal: 'E'}, 
     {indicador: 'Evidenció en oraciones la ampliación del predicado.', literal: 'MB'},
     {indicador: 'Conjugó y completó en elaboración de cuadro los verbos: en pasado, presente y futuro.', literal: 'RN'},
     {indicador: ' En actividad de completación clasificó los artículos en determinados e indeterminados. ', literal: 'RN'},
     {indicador: 'Con ayuda de ejemplos resaltó el sustantivo en cada oración. ', literal: 'MB'},
     {indicador: 'Mostró interés por aprender y comparar los adjetivos de los adverbios', literal: 'E'},
     {indicador: 'Con ayuda de ejemplos resaltó el sustantivo en cada oración. ', literal: 'E'},
]

let indicadores3ByPage = [
     {indicador: 'MODELO DE 3 indicadores by hoja de manera acorde los signos de puntuación tales como: el punto, los dos puntos, la coma, las comillas, signos de interrogación, signos de admiración.', E: true},
     {indicador: 'Comprendió y estableció comparaciones entre la silaba tónica y átona. ', E: true},
     {indicador: 'Distinguió las palabras que llevan acento ortográfico. ', RN: true},
     {indicador: 'Subrayó y utilizó eficazmente el acento prosódico.', MB: true},
     {indicador: ' Con ayuda de ejemplos diferenció las reglas del hiato con la del diptongo y triptongo.', E: true},
     {indicador: 'Maicol data dinamica hahah', E: true},
     {indicador: 'Clasificó las palabras en agudas, graves y esdrújulas.', RN: true},
     {indicador: 'Identificó apropiadamente los elementos de la oración: sujeto, verbo y predicado.', E: true},
     {indicador: 'Por medio de imágenes reconoció y aplicó la ampliación del sujeto.', RN: true},
     {indicador: 'Evidenció en oraciones la ampliación del predicado.',MB: true},
     {indicador: 'Conjugó y completó en elaboración de cuadro los verbos: en pasado, presente y futuro.', RN: true}
]


const creacionBoleta = async(req, res) => {
   try {
     const { alumno } = req.params;

     let modelThreeIndicadores = [{ area: 'Carros y motos', indicadores3ByPage }, { area: 'Cocina y bebidas', indicadores3ByPage }, { area: 'Phone and Tablets', indicadores3ByPage }   ]

     let esto = [{area: 'Turimos y viajes', indicadores}, {area: 'Musica y canto', indicadores}];

     dataToBuildPDF = { alumno, docente: 'Delia Maria Bastidas', esto, modelThreeIndicadores};
     console.log('llego')

     const options = { 
          format: 'letter', 
          path: `pdf/Boleta${alumno}.pdf`,
          margin: { bottom: '12px', top: '6px' } 
     };

     const naveg = await puppeteer.launch();
     const page = await naveg.newPage();
     await page.goto('http://localhost:4000/api/boleta/modelPDF');
 
     await pupeerReport.pdfPage(page, options);
     await naveg.close();
    
     console.log('pdf generated');
     
     dataToBuildPDF = {}; // reiniciar la variable.
     res.sendFile(path.join(__dirname, `../pdf/Boleta${alumno}.pdf`));
   } catch (err) {
        console.log(err.message)
   }
 }


module.exports = {
    InitialsFiveStudents,
    nextFiveStudents,
    indicadorEspecialistaByArea,
    creacionBoleta,
    modelFinalPagePdf
}

/*Helps
      // const pathHtmlFile = path.join(__dirname, '../static/boleta.html');
     // await page.setContent(``);
     // await page.pdf(options);
     // res.contentType('application/pdf');

      // await page.setContent(htmlContent({saludo: 'hola', data: ['daooots']}))
     // await page.goto(path.join(__dirname, '../static/boleta.html'), {waitUntil: 'networkidle2' });
     // let pdf = await page.pdf(options);

     // const page = await naveg.newPage();

*/