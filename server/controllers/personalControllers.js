const pool = require('../configDB/poolConfig');



const validarUsuario = async (req, res) => {
    try {
        const { password, email } = req.body;
        const resDB = await pool.query('SELECT id, nombre, email, cedula, rol, claveuser, especialidad FROM personal WHERE (email = $1)', [email.toLowerCase()]);
        const {claveuser, ...rest} = resDB.rows[0] || {};

        if ( resDB.rows[0]?.rol === 'admin' && password !== resDB.rows[0]?.claveuser ) {
            return res.json({
                autorizacion: false,
                isAdmin: true,
                cedula: resDB.rows[0]?.cedula
            })
        }

        if (resDB.rows[0]?.claveuser !== password) return res.json({autorizacion: false, isAdmin: false});
        if (resDB.rowCount === 1) {
            return res.json({
                datos: rest,
                autorizacion: true, 
                isAdmin: false
            })
        };
    } catch (err) {
        console.log(err.message);
    }
}

const cambiarClaveAdmin = async (req, res) => {
    try {
        const { nuevaClave, email } = req.body;
        await pool.query('UPDATE personal SET claveuser = $1 WHERE email = $2', [nuevaClave, email]);
        res.json({msg: 'La clave ha sido cambiada exitosamente.'})
    } catch (err) {
        console.log(err.message);
    }
}


const updatePersonal = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, especialidad, cedula, email, rol } = req.body;

        await pool.query(`UPDATE personal set nombre = $1, email = $2, rol = $3, cedula = $4, especialidad = $5 WHERE id = $6`, 
            [nombre.trim(), email.trim(), rol, cedula.trim(), especialidad, id]
        );
        res.send('User actualizado');
    } catch (err) {
        console.log(err.message);
    }
}


const getUsers = async (req, res) => {
    try {
        let call = req.params.prop; // OptionsCoordinador  or  UpdatePassword

        if (call === 'OptionsCoordinador') {//Los coordinadores solo deben seleccionar aquellos usuarios que puedan crear indicadores
            const respBD = await pool.query(`SELECT nombre, rol, especialidad, id, cedula FROM personal WHERE rol = $1 OR rol = $2`, ['Especialista', 'Docente']);
            res.json(respBD.rows);
        } else { // Mostrar todos los usuarios para que seleccionen a cual le quieren cambiar la contraseña.
            const respBD = await pool.query(`SELECT nombre, rol, especialidad, id, cedula FROM personal WHERE rol != $1`, ['Director']);
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
    cambiarClaveAdmin,
    getUsers
}