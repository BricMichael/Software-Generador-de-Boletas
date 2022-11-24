const pool = require('../configDB/poolConfig');


const guardarNuevaMateria = async (req, res) => {
    const { materia, tipo } = req.body;
    const estado = true;

    await pool.query('INSERT INTO materias(materia, tipo, estado) VALUES( $1, $2, $3 )', [materia, tipo, estado]);
    res.send('Registro exitoso');
}

const obtenerMaterias = async (req, res) => {
    try {
        const resp = await pool.query('SELECT * FROM materias');
        res.json(resp.rows);

    } catch (err) {
        console.log(err.message);
    }
}

const cambiarEstadoMateria = async (req, res) => {
    try {
        const { estado, idMateria } = req.body;
        await pool.query('UPDATE materias SET estado = $1 WHERE id = $2', [estado, idMateria]);

        res.json({msg: 'Proceso exitoso'});
    } catch (err) {
        console.log(err.message);
    }
}

const consultaTotalStudents = async (req, res) => {
    try {
        const resp = await pool.query('SELECT grado, count(*) as total FROM estudiante GROUP BY grado ORDER BY grado');
        let totalStudents = 0;

        for (const totalByGrado of resp.rows) {
            totalStudents += parseInt(totalByGrado.total);
        }
        resp.rows.push({ total: totalStudents });
        res.json(resp.rows);
    } catch (err) {
        console.log(err.message);
    }
}

const totalUsersByRol = async (req, res) => {
    try {
        const respDB = await pool.query('SELECT rol, count(*) as total FROM personal GROUP BY rol');
        let total = 0;

        for (const item of respDB.rows) total += +item.total;
        respDB.rows.push({ totalUsers: total });
        res.json(respDB.rows);

    } catch (err) {
        console.log(err.message);
    }
}


const deleteStudentsByGrado = async (req, res) => {
    try {
        const { grado } = req.params;
        await pool.query('DELETE FROM estudiante WHERE grado = $1', [grado]);

        res.json({ message: `Acción realizada exitosamente` });
    } catch (error) {
        console.log(error.message);
        res.json({ message: 'Ha ocurrido un error, vuelve a intentarlo' });
    }
}

const deleteAllStudents = async (req, res) => {
    try {
        await pool.query('TRUNCATE TABLE estudiante RESTART IDENTITY');
        res.json({ message: 'Todos los estudiantes fueron eliminados' });
    } catch (err) {
        console.log(err.message);
        res.json({ message: 'Ha ocurrido un error, vuelve a intentarlo' });
    }
}




module.exports = {
    guardarNuevaMateria,
    consultaTotalStudents,
    totalUsersByRol,
    obtenerMaterias,
    deleteStudentsByGrado,
    deleteAllStudents,
    cambiarEstadoMateria
}