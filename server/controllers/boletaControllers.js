const pool = require ('../configDB/poolConfig');


const obtenerMaterias = async (req, res) => {
   try {
        const resp = await pool.query('SELECT materia, tipo FROM materias');
        res.json(resp.rows);

   } catch (err) {
        console.log(err.message);
   }
}

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


// const literalEspecialista = async (req, res) => {  YA NO VA BORRAR ---------------------------------
//      try {
//           const { literal, grado, area } = req.body;

//           const respBD = await pool.query('SELECT descripcion FROM indicador WHERE grado = $1 and literal = $2 and area = $3', [grado, literal, area]);

//           res.json(respBD.rows[0]);
//      } catch (err) {
//           console.log(err.message)
//      }
// }




const indicadoresEspecialistaBoleta = async(req, res) => {
     try {
        const { grado } = req.body;
        const respBD = await pool.query("SELECT descripcion, area, literal FROM indicador WHERE literal != '' and grado= $1", [grado]);
        res.json(respBD.rows);


     } catch (err) {
          console.log(err.message)
     }
}











module.exports = {
    obtenerMaterias,
    InitialsFiveStudents,
    nextFiveStudents,
    indicadoresEspecialistaBoleta,
}