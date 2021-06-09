const pool = require('../configDB/poolConfig');

const mostrarRegistros = async (req, res) => {
    try {
        const resDB = await pool.query('SELECT * FROM personal')
        res.json(resDB.rows)
    } catch (err) {
        console.log(err)
    }
}

const validarUsuario = async(req, res) => {
    try {
        const resDB = await pool.query('SELECT * FROM personal');
        const {email, password } = req.body;
        const enviarFront = resDB.rows.find( user => user.email === email && user.contraseña === password);

        res.json(enviarFront ? enviarFront : 'undefined')

    } catch (err) {
        console.log(err);
    }
}

const registroById = async (req, res) => {
    try {
        const { id } = req.params;
        const resDB = await pool.query('SELECT * FROM personal WHERE id_personal = $1',[id])
        res.json(resDB.rows)
    } catch (err) {
        console.log(err)
    }

}

const updateRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const resDB = await pool.query('UPDATE personal SET campo = $1, campo = $2 WHERE id_personal = $3', ['data nueva del usuario'])
        res.send('Tu registro ha sido actualizado con exito')

    } catch (err) {
        console.log(err)
    }
}

const deleteRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const resDB = await pool.query('DELETE FROM personal WHERE id_personal = $1', [id]);
        res.send('Tu registro ha sido eliminado')
    } catch (error) {
        
    }
}

const registrarUsuario = async (req, res) => {
    try {
        
        const { nombre, email, rol, area_personal, contraseña, estado, fecha_reg } = req.body
        const guardarRegistro = await pool.query('INSERT INTO personal(nombre, email, rol, area_personal, contraseña, estado, fecha_reg) VALUES($1, $2, $3, $4, $5, $6, $7)', [nombre, email, rol, area_personal, contraseña, estado, fecha_reg]);
        res.send('Usuario registado con exito!!!')

    } catch (err) {
        console.log(err)
    }
} 



module.exports = {
    mostrarRegistros,
    registroById,
    updateRegistro,
    deleteRegistro,
    registrarUsuario,
    validarUsuario
}