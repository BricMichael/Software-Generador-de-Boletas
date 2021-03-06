const pool = require ('../configDB/poolConfig');
const puppeteer = require('puppeteer');


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

const creacionBoleta = async(req, res) => {
     const { alumno } = req.params;
 
     const naveg = await puppeteer.launch();
     const page = await naveg.newPage();
     const options = { format: 'A4', path: `pdf/Boleta${alumno}.pdf`};

     await page.goto('http://localhost:4000', {waitUntil: 'networkidle2' });
     await page.pdf(options);
     
     await naveg.close();
    
     console.log('pdf generated');
     res.send(`La boleta al estudiante ${alumno} ha sido creada exitosamente`);
}


module.exports = {
    InitialsFiveStudents,
    nextFiveStudents,
    creacionBoleta,
    indicadorEspecialistaByArea
}