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
          const boletasPendingsBySeccion = respDB[2].rows.find(student => student.boleta_generada === 'Pendiente');

          if (!boletasPendingsBySeccion) {
               data.push(respDB[0].rows, respDB[1].rowCount, { total: 0 });
          } else {
               data.push(respDB[0].rows, respDB[1].rowCount, { total: +boletasPendingsBySeccion.total });
          }
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

          const boletasPendingsBySeccion = respDB[1].rows.find(student => student.boleta_generada === 'Pendiente');

          if (!boletasPendingsBySeccion) {
               data.push(respDB[0].rows, { total: 0 });
          } else {
               data.push(respDB[0].rows, { total: +boletasPendingsBySeccion.total });
          }

          res.json(data);
     } catch (err) {
          console.log(err.message);
     }

}


const indicadorEspecialistaByArea = async (req, res) => {
     try {
          const { grado, area, momento, anioIndicadores } = req.body;

          const respBD = await pool.query("SELECT indicador, area, literal FROM indicador WHERE grado = $1 and area = $2 and momento = $3 and fecha_creacion = $4", [grado, area, momento, anioIndicadores]);

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
     let check_especialista_boleta = null;
     let check_docente_boleta = null;
     let check_observacion = null;

     try {
          const {
               anio_escolar,
               grado, 
               seccion,
               cedula_estudiante,
               momento,
               especialidad,
               nombre_estudiante,
               mes_momento_inicio,
               mes_momento_fin,
               rolPersonal,
               indicadores,
               observacion
          } = req.body;
                    
          if ( rolPersonal === 'docente') {
               check_docente_boleta = { indicadores };
               check_observacion = observacion;
          } else {
               check_especialista_boleta = { indicadores };
          }

          await pool.query(`
               INSERT INTO boleta ( anio_escolar, grado, seccion, cedula_estudiante, docente_boleta, momento, especialista_boleta, especialidad, nombre_estudiante, mes_momento_inicio, mes_momento_fin, observacion ) 
               VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )`, 
               [ anio_escolar, grado, seccion, cedula_estudiante, check_docente_boleta, momento, check_especialista_boleta, especialidad, nombre_estudiante, mes_momento_inicio, mes_momento_fin, check_observacion ]
          );
          res.json({mensaje: 'La boleta ha sido registrada', exito: true});
     } catch (err) {
          console.log(err.message);
          res.status(400).json('Ha ocurrido un error, vuelve a intentarlo');
     }
}

const getBoletaByStudentAndId = async (req, res) => {
     try {
          const { anio_escolar, grado, seccion, cedula_estudiante, momento } = req.body;

          const respDB = await pool.query(`
               SELECT * FROM boleta WHERE cedula_estudiante = $1 
               AND anio_escolar = $2 AND grado = $3 AND momento = $4`, 
               [cedula_estudiante, anio_escolar, grado, momento]
          );
          res.json({data: respDB.rows});
     } catch (err) {
          console.log(err.message);
     }
}


const obtenerBoletasPorEstudiante = async (req, res) => { // trabajando aqui
     try {
          const { cedulaEscolar, momento, grado, anio_escolar } = req.body;

          const respDB = await pool.query(`SELECT * FROM boleta WHERE cedula_estudiante = $1 AND momento = $2 AND grado = $3 AND anio_escolar = $4`, [cedulaEscolar, momento, grado, anio_escolar]);
          res.json({
               exito: true,
               datos: respDB.rows
          })
     } catch (err) {
          console.log(err.message);
     }
}

const eliminarBoleta = async (req, res) => {
     try {
          const { cedulaEscolar, momento, anio_escolar } = req.body

          const response = await pool.query('DELETE FROM boleta WHERE cedula_estudiante = $1 AND momento = $2 AND anio_escolar = $3', [cedulaEscolar.trim(), momento, anio_escolar]);

          if (!response.rowCount) return res.json({ error: true, msg: 'Algo ha ido mal, vuelve a intentarlo.' });

          res.json({ error: false, msg: 'Boleta eliminada exitosamente.' });
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
     obtenerBoletasPorEstudiante,
     eliminarBoleta,
     eliminarAllBoletas
}
