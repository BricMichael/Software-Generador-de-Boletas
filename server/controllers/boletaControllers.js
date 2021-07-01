const pool = require ('../configDB/poolConfig');


const obtenerMaterias = async (req, res) => {
   try {
        const resp = await pool.query('SELECT materia, tipo FROM materias');
        res.json(resp.rows);

   } catch (err) {
        console.log(err.message);
   }
}

const fiveStudents = async (req, res) => {
   try {
        const { valorInicial } = req.body;
        const respBD = await pool.query('SELECT nombres, grado, seccion FROM estudiante OFFSET $1 LIMIT $2', [valorInicial, 5]);
        res.json(respBD.rows);

   } catch (err) {
        console.log(err.message);
   }

}


















module.exports = {
    obtenerMaterias,
    fiveStudents
}