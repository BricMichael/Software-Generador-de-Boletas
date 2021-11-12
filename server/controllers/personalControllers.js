const pool = require('../configDB/poolConfig');



const validarUsuario = async (req, res) => {
    try {
        const { password, email } = req.body;

        const resDB = await pool.query('SELECT  id, nombre, email, rol, area_personal  FROM personal WHERE (email = $1) and (claveuser = $2)', [email.toLowerCase(), password]);

        if (resDB.rowCount === 0) return res.json('undefined');
        if (resDB.rowCount === 1) return res.json(resDB.rows[0]);

    } catch (err) {
        console.log(err.message);
    }
}


const updatePersonal = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, area_personal, cedula, email, rol } = req.body;

        await pool.query(`UPDATE personal set nombre = $1, email = $2, rol = $3, cedula = $4, area_personal = $5 WHERE id = $6`, [nombre.trim(), email.trim(), rol, cedula.trim(), area_personal, id]);

        res.send('User actualizado');
    } catch (err) {
        console.log(err.message);
    }
}


const getUsers = async (req, res) => {
    try {
        let call = req.params.prop; // OptionsCoordinador  or  UpdatePassword

        if (call === 'OptionsCoordinador') {//Los coordinadores solo deben seleccionar aquellos usuarios que puedan crear indicadores
            const respBD = await pool.query(`SELECT nombre, rol, area_personal, id, cedula FROM personal WHERE rol = $1 OR rol = $2`, ['Especialista', 'Docente']);
            res.json(respBD.rows);
        } else { // Mostrar todos los usuarios para que seleccionen a cual le quieren cambiar la contraseña.
            const respBD = await pool.query(`SELECT nombre, rol, area_personal, id, cedula FROM personal WHERE rol != $1`, ['Director']);
            res.json(respBD.rows);
        }

    } catch (err) {
        console.log(err.message);
    }
}

const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const clave = req.body.password.trim();

        await pool.query(`UPDATE personal SET claveuser = $1 WHERE id = $2`, [clave, id]);

        res.send('Password updated');
    } catch (err) {
        console.log(err.message);
    }
}





module.exports = {
    validarUsuario,
    updatePersonal,
    updatePassword,
    getUsers
}