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
     res.render('main', dataToBuildPDF);  
 }

const creacionBoleta = async(req, res) => {
   try {
     const { alumno } = req.params;

     let esto = [{area: 'ÁREA: Turimos y negocios', indicadores}]

     dataToBuildPDF = { alumno, docente: 'Delia Maria Bastidas', esto};
     console.log('llego')

     const options = { 
          format: 'letter', 
          path: `pdf/Boleta${alumno}.pdf`,
          margin: { bottom: '15px', top: '6px' } 
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