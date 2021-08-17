const pool = require ('../configDB/poolConfig');


const guardarNuevaMateria = async( req, res ) => {
    const { materia, tipo } = req.body;

    await pool.query('INSERT INTO materias(materia, tipo) VALUES( $1,$2 )', [materia, tipo]);
    res.send('Registro exitoso');
}









module.exports = {
    guardarNuevaMateria
}