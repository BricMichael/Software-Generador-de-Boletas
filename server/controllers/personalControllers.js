const pool = require('../configDB/poolConfig');



// 
const validarUsuario = async(req, res) => {
    try {
        const { email, password } = req.body;
        const resDB = await pool.query('SELECT  id, nombre, email, rol, area_personal  FROM personal WHERE (email = $1) and (claveuser = $2)', [email, password]);

        if( resDB.rowCount === 0) res.json('undefined');
        if( resDB.rowCount === 1 ) res.json( resDB.rows[0] ); 

    } catch (err) {
        console.log(err.message);
    }
}


const updatePersonal = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, area_personal, cedula, email, rol }  = req.body;

        await pool.query(`UPDATE personal set nombre = $1, email = $2, rol = $3, cedula = $4, area_personal = $5 WHERE id = $6`, [nombre, email, rol, cedula, area_personal, id ]);

        res.send('User actualizado');
    } catch (err) {
        console.log(err.message);
    }
}


const getUserByCedula = async(req, res) => {
    try {
        const cedula  = req.params.cedula.trim();
        const respBD = await pool.query(`SELECT nombre, rol, area_personal, id FROM personal WHERE cedula = $1`, [ cedula ]);
        if( respBD.rowCount === 0 ){
            res.json({ error: 'No se ha podido encontrar al usuario, vuelve a intentarlo.' });
        } else {
            res.json(respBD.rows[0]);     
        }
        
    } catch (err) {
        console.log(err.message);
    }
}

const updatePassword = async(req, res) => {
    try {
        const { id } = req.params;
        const clave = req.body.password.trim();

        await pool.query(`UPDATE personal set claveuser = $1 WHERE id = $2`, [ clave, id ]);

        res.send('Password updated');
    } catch (err) {
        console.log(err.message);
    }
}





module.exports = {
    validarUsuario,
    updatePersonal,
    updatePassword,
    getUserByCedula
}