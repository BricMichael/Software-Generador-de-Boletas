const pool = require('../configDB/poolConfig');
const puppeteer = require('puppeteer');
const pupeerReport = require('puppeteer-report');
const path = require('path');
const { serYConvivir, especialistas, transformarDataClient } = require('../helpers/parseoDataPDF');



const initialsFiveStudents = async (req, res) => {
     try {
          const { gradoSelected, seccionSelected } = req.body;
          let data = [];

          const respDB = await Promise.all([
               pool.query('SELECT * FROM estudiante WHERE (grado = $1) and (seccion = $2) OFFSET $3 LIMIT $4', [gradoSelected, seccionSelected, 0, 5]),
               pool.query('SELECT id FROM estudiante WHERE (grado = $1) and (seccion = $2)', [gradoSelected, seccionSelected]),
               pool.query(`SELECT boleta_generada, count(*) as total FROM estudiante WHERE (grado = $1) and (seccion = $2) GROUP BY boleta_generada`, [gradoSelected, seccionSelected])
          ]);
          const boletasPendingsByGrado = +respDB[2].rows.find(student => student.boleta_generada === 'Pendiente')?.total;

          data.push(respDB[0].rows, respDB[1].rowCount, { total: !boletasPendingsByGrado ? 0 : boletasPendingsByGrado });
          res.json(data);
          /* indice [1] es total de estudiantes por seccion. indice [2] total de estudiantes por Grado, 
          si el find arroja undefined quiere decir que todos los de ese grado tienen la boleta generada, 
          ya que por defecto será el total de estudiantes que haya por grado. */
     } catch (err) {
          console.log(err.message);
     }

}

const showFiveStudents = async (req, res) => {
     try {
          const { valorInicial, gradoSelected, seccionSelected } = req.body;
          const data = [];

          const respDB = await Promise.all([pool.query('SELECT * FROM estudiante WHERE (grado = $1) and (seccion = $2) OFFSET $3 LIMIT $4', [gradoSelected, seccionSelected, valorInicial, 5]),
          pool.query(`SELECT boleta_generada, count(*) as total FROM estudiante WHERE (grado = $1) and (seccion = $2) GROUP BY boleta_generada`, [gradoSelected, seccionSelected])
          ]);

          const boletasPendingsByGrado = +respDB[1].rows.find(student => student.boleta_generada === 'Pendiente')?.total;

          data.push(respDB[0].rows, { total: !boletasPendingsByGrado ? 0 : boletasPendingsByGrado });
          res.json(data);
     } catch (err) {
          console.log(err.message);
     }

}


const indicadorEspecialistaByArea = async (req, res) => {
     const anio = new Date().getFullYear();
     try {
          const { grado, area, momento } = req.body;

          const respBD = await pool.query("SELECT indicador, area, literal FROM indicador WHERE grado = $1 and area = $2 and momento = $3 and fecha_creacion = $4", [grado, area, momento, anio]);

          res.json(respBD.rows);
     } catch (err) {
          console.log(err.message)
     }
}

const personalFirmas = async (req, res) => {
     try {
          const respDB = await pool.query('SELECT nombre, rol FROM personal WHERE rol = $1 OR rol = $2', ['Coordinador', 'Director']);

          let sendNames = {};
          respDB.rows.forEach(value => {
               value.rol === 'Director' ? sendNames.directora = value.nombre : sendNames.coordinadora = value.nombre
          });

          res.json(sendNames);
     } catch (err) {
          console.log(err.message);

     }
}

//BOLETA FUNCIONES

let dataToBuildPDF = {};
const modelFinalPagePdf = (req, res) => {
     // console.log(dataToBuildPDF)
     res.setHeader('Content-Type', 'text/html');
     res.render('index', dataToBuildPDF);
}

let indicadores = [
     { indicador: 'Identificó de manera acorde los signos de puntuación tales como: el punto, los dos puntos, la coma, las comillas, signos de interrogación, signos de admiración.', literal: 'E' },
     { indicador: 'Comprendió y estableció comparaciones entre la silaba tónica y átona. ', literal: 'E' },
     { indicador: 'Distinguió las palabras que llevan acento ortográfico. ', literal: 'RN' },
     { indicador: 'Subrayó y utilizó eficazmente el acento prosódico.', literal: 'E' },
     { indicador: ' Con ayuda de ejemplos diferenció las reglas del hiato con la del diptongo y triptongo.', literal: 'B' },
     { indicador: 'Maicol data dinamica hahah', literal: 'B' },
     { indicador: 'Clasificó las palabras en agudas, graves y esdrújulas.', literal: 'E' },
     { indicador: 'Identificó apropiadamente los elementos de la oración: sujeto, verbo y predicado.', literal: 'RN' },
     { indicador: 'Por medio de imágenes reconoció y aplicó la ampliación del sujeto.', literal: 'E' },
     { indicador: 'Evidenció en oraciones la ampliación del predicado.', literal: 'B' },
     { indicador: 'Conjugó y completó en elaboración de cuadro los verbos: en pasado, presente y futuro.', literal: 'RN' },
     { indicador: ' En actividad de completación clasificó los artículos en determinados e indeterminados. ', literal: 'RN' },
     { indicador: 'Con ayuda de ejemplos resaltó el sustantivo en cada oración. ', literal: 'B' },
     { indicador: 'Mostró interés por aprender y comparar los adjetivos de los adverbios', literal: 'E' },
     { indicador: 'Con ayuda de ejemplos resaltó el sustantivo en cada oración. ', literal: 'E' },
]

let indicadores3ByPage = [
     { indicador: 'MODELO DE 3 indicadores by hoja de manera acorde los signos de puntuación tales como: el punto, los dos puntos, la coma, las comillas, signos de interrogación, signos de admiración.', literal: 'E' },
     { indicador: 'Comprendió y estableció comparaciones entre la silaba tónica y átona. ', literal: 'B' },
     { indicador: 'Distinguió las palabras que llevan acento ortográfico. ', literal: 'B' },
     { indicador: 'Subrayó y utilizó eficazmente el acento prosódico.', literal: 'B' },
     { indicador: ' Con ayuda de ejemplos diferenció las reglas del hiato con la del diptongo y triptongo.', literal: 'E' },
     { indicador: 'MODELO DE 3 indicadores by hoja de manera acorde los signos de puntuación tales como: el punto, los dos puntos, la coma, las comillas, signos de interrogación, signos de admiración.', literal: 'E' },
     { indicador: 'Clasificó las palabras en agudas, graves y esdrújulas.', literal: 'RN' },
     { indicador: 'Identificó apropiadamente los elementos de la oración: sujeto, verbo y predicado.', literal: 'B' },
     { indicador: 'Por medio de imágenes reconoció y aplicó la ampliación del sujeto.', literal: 'E' },
     { indicador: 'Evidenció en oraciones la ampliación del predicado.', literal: 'B' },
     { indicador: 'Evidenció en oraciones la ampliación del predicado.', literal: 'RN' },
]

const creacionBoleta = async (req, res) => { //5 cortos 3 largos
     try {
          const data = req.body; //Dalimilet Herrera directora

          console.log('llego')
          dataToBuildPDF = transformarDataClient(data);
          console.log('lista la transformacion de la data')
          const options = {
               format: 'letter',
               path: `pdf/Boleta${data.studentSelected.nombres}.pdf`,
               margin: { bottom: '12px', top: '6px' }
          };

          const naveg = await puppeteer.launch();
          const page = await naveg.newPage();
          await page.goto('http://localhost:4000/api/boleta/modelPDF');

          await pupeerReport.pdfPage(page, options);
          await naveg.close();
          dataToBuildPDF = {}; // reiniciar la variable.

          console.log('pdf generated, id student => ', data.studentSelected.id);
          const indicadoresBoleta = {
               docente: data.indicadoresByArea,
               especialista: data.literalesEspecialistas,
               serYConvivir: data.descripAndDate.textArea
          }

          const promisesQuerys = [pool.query(`INSERT INTO boleta( anio_escolar, grado, seccion, indicadores_boleta, momento, nombre_estudiante, nombre_docente, cedula_estudiante, fecha_de_creacion ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
               [data.descripAndDate.anioEscolar, data.studentSelected.grado, data.studentSelected.seccion, indicadoresBoleta, data.momento, data.studentSelected.nombres, data.studentSelected.docente, data.studentSelected.cedula_escolar, data.fecha_de_creacion
               ])
          ];

          if (data.boletasPendientesByGrado > 1) {
               promisesQuerys.push(pool.query('UPDATE estudiante SET boleta_generada = $1 WHERE id = $2', ['Generada', data.studentSelected.id]));
          }

          if (data.boletasPendientesByGrado <= 1) {
               promisesQuerys.push(pool.query(`UPDATE estudiante SET boleta_generada = $1 WHERE grado = $2 AND seccion = $3`,
                    ['Pendiente', data.studentSelected.grado, data.studentSelected.seccion]))
          }

          await Promise.all(promisesQuerys);

          // res.sendFile(path.join(__dirname, `../pdf/Boleta${data.studentSelected.nombres}.pdf`));
          res.json({
               aviso: data.boletasPendientesByGrado <= 1
                    ? `Todos tus estudiantes tienen la boleta de clasificación 'Completada', por ende serán actualizados a "Pendiente" para el proximo Momento.`
                    : 'La boleta fue generada exitosamente, continúa con el siguiente alumno.'
          })

     } catch (err) {
          console.log(err.message);
          dataToBuildPDF = {}; // reiniciar la variable.
          await naveg.close();
          res.status(400).json('Ha ocurrido un error, vuelve a intentarlo');
     }
}



module.exports = {
     initialsFiveStudents,
     showFiveStudents,
     personalFirmas,
     indicadorEspecialistaByArea,
     creacionBoleta,
     modelFinalPagePdf
}

// /*Helps
//       // const pathHtmlFile = path.join(__dirname, '../static/boleta.html');
//      // await page.setContent(``);
//      // await page.pdf(options);
//      // res.contentType('application/pdf');

//       // await page.setContent(htmlContent({saludo: 'hola', data: ['daooots']}))
//      // await page.goto(path.join(__dirname, '../static/boleta.html'), {waitUntil: 'networkidle2' });
//      // let pdf = await page.pdf(options);

//      // const page = await naveg.newPage();


//         // { area: 'EXPERIMENTO CIENTÍFICO ',indicadores: [ {indicador: 'Elaboró un collage en la presentación de experimento científico. elaboro', literal: 'E'}, {indicador: 'Elaboró un collage en la presentación de experimento científico. elaboro', literal: 'E'}, ]}
//      // let mezcla = [ ...esto];
//      // transformarDataClient(mezcla);

// */