const pool = require('../configDB/poolConfig');




const validarUsuario = async(req, res) => {
    try {
        const { email, password } = req.body;
        const resDB = await pool.query('SELECT  id, nombre, email, rol, area_personal  FROM personal WHERE (email = $1) and (claveuser = $2)', [email, password]);
        
        if( !response ) res.json('undefined');
        if( response) res.json( resDB.rows[0] ); 

    } catch (err) {
        console.log(err.message);
    }
}


const updatePersonal = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, area, cedula, email, rol }  = req.body;

        await pool.query(`UPDATE personal set nombre = $1, email = $2, rol = $3, cedula = $4, area_personal = $5 WHERE id = $6`, [nombre, email, rol, cedula, area, id ]);

        res.send('User actualizado');
    } catch (err) {
        console.log(err);
    }
}


const seePasswordUser = async(req, res) => {
    try {
        const { id } = req.params;

        const respBD = await pool.query(`SELECT claveuser FROM personal WHERE id = $1`, [ id ]);

        res.json(respBD.rows[0]);
    } catch (err) {
        console.log(err);
    }
}

const updatePassword = async(req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        await pool.query(`UPDATE personal set claveuser = $1 WHERE id = $2`, [ password, id ]);

        res.send('Password updated');
    } catch (err) {
        console.log(err);
    }
}





module.exports = {
    validarUsuario,
    updatePersonal,
    updatePassword,
    seePasswordUser
}