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

const consultaTotalStudents = async(req, res) => {
    try {
        const resp = await pool.query('SELECT grado, count(*) as total FROM estudiante GROUP BY grado ORDER BY grado');
        let totalStudents = 0;
 
        for (const totalByGrado of resp.rows ) {
            totalStudents += parseInt(totalByGrado.total);
        }
        resp.rows.push({ total: totalStudents });
        res.json( resp.rows );
    } catch (err) {
        console.log(err.message);
    }
}

const deleteStudentsByGrado = async(req, res) => {
    try {
        const { grado } = req.params;
        await pool.query('DELETE FROM estudiante WHERE grado = $1', [grado]);

        res.json({message: `Acción realizada exitosamente`});
    } catch (error) {
        console.log(error.message);
        res.json({message: 'Ha ocurrido un error, vuelve a intentarlo'});
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
    consultaTotalStudents,
    obtenerMaterias,
    deleteStudentsByGrado,
    deleteAllStudents,
}