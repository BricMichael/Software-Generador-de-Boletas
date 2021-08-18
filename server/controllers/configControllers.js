const pool = require ('../configDB/poolConfig');


const guardarNuevaMateria = async( req, res ) => {
    const { materia, tipo } = req.body;

    await pool.query('INSERT INTO materias(materia, tipo) VALUES( $1,$2 )', [materia, tipo]);
    res.send('Registro exitoso');
}

const obtenerMaterias = async (req, res) => {
    try {
         const resp = await pool.query('SELECT materia, tipo, id FROM materias');
         res.json(resp.rows);
 
    } catch (err) {
         console.log(err.message);
    }
 }

const deleteAllStudents = async(req, res) => {
    try {
        await pool.query('TRUNCATE TABLE estudiante RESTART IDENTITY');
        res.json({message: 'Todos los estudiantes fueron eliminados'});
    } catch (err) {
        console.log(err.message);
        res.json({message: 'Ha ocurrido un error, vuelve a intentarlo'});
    }
}






module.exports = {
    guardarNuevaMateria,
    obtenerMaterias,
    deleteAllStudents,
}