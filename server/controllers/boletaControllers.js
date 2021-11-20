const pool = require('../configDB/poolConfig');
const fs = require('fs').promises
const path = require('path');
const { transformarDataClient } = require('../helpers/parseoDataPDF');
const { generarPdfWithPuppeter, guardarDatosBoleta } = require('../helpers/generarPDF');


const initialsFiveStudents = async (req, res) => {
     try {
          const { gradoSelected, seccionSelected } = req.body;
          let data = [];

          const respDB = await Promise.all([
               pool.query('SELECT * FROM estudiante WHERE (grado = $1) and (seccion = $2) OFFSET $3 LIMIT $4', [gradoSelected, seccionSelected, 0, 5]),
               pool.query('SELECT id FROM estudiante WHERE (grado = $1) and (seccion = $2)', [gradoSelected, seccionSelected]),
               pool.query(`SELECT boleta_generada, count(*) as total FROM estudiante WHERE (grado = $1) and (seccion = $2) GROUP BY boleta_generada`, [gradoSelected, seccionSelected])
          ]);
          const boletasPendingsBySeccion = +respDB[2].rows.find(student => student.boleta_generada === 'Pendiente')?.total;

          data.push(respDB[0].rows, respDB[1].rowCount, { total: !boletasPendingsBySeccion ? 0 : boletasPendingsBySeccion });
          res.json(data);
          /* indice [1] es total de estudiantes por seccion. indice [2] total de estudiantes pendiente por boleta por seccion, 
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

          const boletasPendingsBySeccion = +respDB[1].rows.find(student => student.boleta_generada === 'Pendiente')?.total;

          data.push(respDB[0].rows, { total: !boletasPendingsBySeccion ? 0 : boletasPendingsBySeccion });
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

          let sendNamesFirmas = {};
          respDB.rows.forEach(value => {
               value.rol === 'Director' ? sendNamesFirmas.directora = value.nombre : sendNamesFirmas.coordinadora = value.nombre
          });

          res.json(sendNamesFirmas);
     } catch (err) {
          console.log(err.message);

     }
}


let dataToBuildPDF = {};
const modelFinalPagePdf = (req, res) => {
     res.setHeader('Content-Type', 'text/html');
     res.render('index', dataToBuildPDF);
}


const creacionBoleta = async (req, res) => {
     try {
          const data = req.body; //Dalimilet Herrera directora
          const { studentSelected, descripAndDate } = data;

          dataToBuildPDF = transformarDataClient(data);
          await generarPdfWithPuppeter(data.studentSelected.nombres);
          dataToBuildPDF = {}; // reiniciar la data de la variable al generar la boleta.

          await guardarDatosBoleta(data);

          res.sendFile(path.join(__dirname, `../pdf/${studentSelected.nombres}boleta.pdf`));

          setTimeout(() => {
               fs.unlink(path.join(__dirname, `../pdf/${studentSelected.nombres}boleta.pdf`))
          }, 1000);
     } catch (err) {
          console.log(err.message);
          dataToBuildPDF = {}; // reiniciar la variable.
          res.status(400).json('Ha ocurrido un error, vuelve a intentarlo');
     }
}

const getBoletaByStudentAndId = async (req, res) => {
     try {
          const { cedula, momento, anio_escolar } = req.body;
          const respDB = await pool.query(`SELECT * FROM boleta WHERE cedula_estudiante = $1 
          AND momento = $2 AND anio_escolar = $3`, [cedula.trim(), momento, anio_escolar]);

          res.json(respDB.rows);
     } catch (err) {
          console.log(err.message);
     }
}


const generarBoletaExistente = async (req, res) => { // Generar boleta existente, creada hace semanas, meses o años atrás.
     try {
          const data = req.body;
          dataToBuildPDF = transformarDataClient(data);
          await generarPdfWithPuppeter(data.studentSelected.nombres);
          dataToBuildPDF = {}; // reiniciar la data de la variable al generar la boleta.

          res.sendFile(path.join(__dirname, `../pdf/${data.studentSelected.nombres}boleta.pdf`));

          setTimeout(() => {
               fs.unlink(path.join(__dirname, `../pdf/${data.studentSelected.nombres}boleta.pdf`))
          }, 1000);
     } catch (err) {
          console.log(err.message);
          dataToBuildPDF = {}; // reiniciar la variable en caso de error.
     }
}

const eliminarBoleta = async (req, res) => {
     try {
          const { cedulaEscolar, momento, anio_escolar } = req.body

          await pool.query('DELETE FROM boleta WHERE cedula_estudiante = $1 AND momento = $2 AND anio_escolar = $3', [cedulaEscolar.trim(), momento, anio_escolar]);

          res.json({ msg: 'Boleta eliminada exitosamente' });
     } catch (err) {
          console.log(err.message);
     }
}

const eliminarAllBoletas = async (req, res) => {
     try {
          const { claveAdmin, emailAdmin } = req.body;
          // consultar si ese administrador existe mediante su correo y password.
          const checkUsuario = await pool.query('SELECT * FROM personal WHERE claveuser = $1 AND email = $2', [claveAdmin.trim(), emailAdmin]);
          if (!checkUsuario.rowCount) return res.json({ error: 'La contraseña no coincide, operación rechazada' });
          if (checkUsuario.rows[0].rol !== 'Admin') return res.json({ error: 'Solo los administradores pueden realizar esta operación' });

          await pool.query('TRUNCATE TABLE boleta RESTART IDENTITY');
          res.json({ res: 'La acción fue ejecutada exitosamente' });
     } catch (err) {
          console.log(err.message);
     }
}


module.exports = {
     initialsFiveStudents,
     showFiveStudents,
     personalFirmas,
     indicadorEspecialistaByArea,
     creacionBoleta,
     modelFinalPagePdf,
     getBoletaByStudentAndId,
     generarBoletaExistente,
     eliminarBoleta,
     eliminarAllBoletas
}
