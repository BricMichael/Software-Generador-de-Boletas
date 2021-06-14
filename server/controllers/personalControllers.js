const pool = require('../configDB/poolConfig');


const mostrarRegistros = async (req, res) => {
    try {
        const resDB = await pool.query('SELECT * FROM personal')
        res.json(resDB.rows)
    } catch (err) {
        console.log(err.message);
    }
}

const validarUsuario = async(req, res) => {
    try {
        const {email, password } = req.body;
        const resDB = await pool.query('SELECT * FROM personal WHERE (email = $1) and (contraseña = $2)', [email, password]);
        const deletePassword = resDB.rows[0];
        
        if( !deletePassword ) res.json('undefined');
        if( deletePassword ) {
            delete deletePassword.contraseña;
            res.json(deletePassword);
        } 

    } catch (err) {
        console.log(err.message);
    }
}

const obtenerRegistroById = async (req, res) => {
    try {
        const { id } = req.params;
        const resDB = await pool.query('SELECT * FROM personal WHERE id_personal = $1',[id]);
        res.json(resDB.rows[0]);
    } catch (err) {
        console.log(err.message);
    }

}

const updateRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const resDB = await pool.query('UPDATE personal SET campo = $1, campo = $2 WHERE id_personal = $3', ['data nueva del usuario'])
        res.send('Tu registro ha sido actualizado con exito')

    } catch (err) {
        console.log(err.message);
    }
}

const deleteRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const resDB = await pool.query('DELETE FROM personal WHERE id_personal = $1', [id]);
        res.send('Tu registro ha sido eliminado')
    } catch (err) {
        console.log(err.message);
    }
}

const registrarUsuario = async (req, res) => {
    try {
        
        const { nombre, email, rol, area_personal, contraseña, estado, fecha_reg } = req.body
        const guardarRegistro = await pool.query('INSERT INTO personal(nombre, email, rol, area_personal, contraseña, estado, fecha_reg) VALUES($1, $2, $3, $4, $5, $6, $7)', [nombre, email, rol, area_personal, contraseña, estado, fecha_reg]);
        res.send('Usuario registado con exito!!!')

    } catch (err) {
        console.log(err.message);
    }
} 



module.exports = {
    mostrarRegistros,
    obtenerRegistroById,
    updateRegistro,
    deleteRegistro,
    registrarUsuario,
    validarUsuario
}