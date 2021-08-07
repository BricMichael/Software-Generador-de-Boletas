const pool = require('../configDB/poolConfig');


const registroEstudiante = async( req, res) => {
    try {
        const { nombres, cedulaE, genero, grado, seccion } = req.body;

        const respBD = await pool.query('SELECT cedula_escolar FROM estudiante WHERE cedula_escolar = $1', [cedulaE])

        if ( respBD.rowCount === 1 ) {
            res.json({msg: 'Error: Ya existe un estudiante con esa cédula escolar'});
        }
        else{
            await pool.query('INSERT INTO estudiante( cedula_escolar, nombres, genero, grado, seccion ) VALUES($1,$2, $3, $4, $5)', [cedulaE, nombres, genero, grado, seccion]);

            res.json({msg: 'Estudiante registrado exitosamente'});
        }

    } catch (err) {
        console.log(err.message);
    }

}


const registroUsuario = async( req, res) => {
    try {
        const dateToday = new Date().toDateString();
        const { nombre, area, cedula, email, password, rol }  = req.body;

        const respBD = await pool.query(`SELECT * FROM personal WHERE cedula = $1 OR email = $2`, [cedula, email])

        if ( respBD.rowCount === 1 ) {
            res.json({msg: 'Error: Ya existe un usuario con ese correo electrónico o cédula'})
        }
        else{
            await pool.query('INSERT INTO personal( nombre, email, rol, cedula, area_personal, claveuser, fecha_reg ) VALUES($1,$2, $3, $4, $5, $6, $7)', [nombre, email, rol,cedula,area, password, dateToday ]);
            
            res.json({msg: 'Usuario registrado exitosamente'});
        }

    } catch (err) {
        console.log(err.message);
    }

}

const updateEstudiante = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombres, cedulaE, genero, grado, seccion } = req.body;

        await pool.query(`UPDATE estudiante set cedula_escolar = $1, nombres = $2, genero = $3,  grado = $4, seccion = $5 WHERE id = $6`, [cedulaE, nombres, genero, grado, seccion, id ]);

        res.send('Estudiante actualizado');
    } catch (err) {
        console.log(err);
    }
}

//
const allRegistrosUsuarios = async (req, res) => {
    try {
        const resDB = await pool.query('SELECT claveuser, id, nombre, email, rol, cedula, area_personal FROM personal ORDER BY nombre');
        res.json(resDB.rows);
    } catch (err) {
        console.log(err.message);
    }
}

const getEstudiantebyCedula = async (req, res) => {
    try {
        const { cedula } = req.body;
        const resDB = await pool.query('SELECT * FROM estudiante WHERE cedula_escolar = $1', [cedula]);
        res.json(resDB.rows[0]);
    } catch (err) {
        console.log(err.message);
    }

}


const eliminarRegistro = async(req, res) => {
    try {
        const { id } = req.params;
        const  tablaName  = req.query.tabla;
        await pool.query(`DELETE FROM ${tablaName} WHERE id = $1`, [id]);

        res.send('Registro eliminado');

    } catch (err) {
        console.log( err.message );
    }
}

module.exports = {
    registroEstudiante,
    registroUsuario,
    allRegistrosUsuarios,
    getEstudiantebyCedula,
    updateEstudiante,
    eliminarRegistro
}