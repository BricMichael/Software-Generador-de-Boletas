const pool = require('../configDB/poolConfig');


const registroEstudiante = async (req, res) => {
    try {
        const { nombres, cedulaE, genero, grado, seccion } = req.body;

        const respBD = await pool.query('SELECT cedula_escolar FROM estudiante WHERE cedula_escolar = $1', [cedulaE.trim()])

        if (respBD.rowCount === 1) {
            res.json({ msg: 'Error: Ya existe un estudiante con esa cédula escolar' });
        }
        else {
            await pool.query('INSERT INTO estudiante( cedula_escolar, nombres, genero, grado, seccion, boleta_generada) VALUES($1,$2, $3, $4, $5, $6)', [cedulaE.trim(), nombres.toUpperCase(), genero, grado, seccion, 'Pendiente']);

            res.json({ msg: 'Estudiante registrado exitosamente' });
        }

    } catch (err) {
        console.log(err.message);
    }

}


const registroUsuario = async (req, res) => {
    try {
        const dateToday = new Date().toDateString();
        const { nombre, area, cedula, email, password, rol } = req.body;

        const respBD = await pool.query(`SELECT * FROM personal WHERE cedula = $1 OR email = $2`, [cedula, email])

        if (respBD.rowCount === 1) {
            res.json({ msg: 'Error: Ya existe un usuario con ese correo electrónico o cédula' })
        }
        else {
            await pool.query('INSERT INTO personal( nombre, email, rol, cedula, area_personal, claveuser, fecha_reg ) VALUES($1,$2, $3, $4, $5, $6, $7)', [nombre.trim(), email.trim(), rol, cedula.trim(), area, password, dateToday]);

            res.json({ msg: 'Usuario registrado exitosamente' });
        }

    } catch (err) {
        console.log(err.message);
    }

}

const updateEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombres, cedula_escolar, genero, grado, seccion } = req.body;

        await pool.query(`UPDATE estudiante SET cedula_escolar = $1, nombres = $2, genero = $3,  grado = $4, seccion = $5 WHERE id = $6`, [cedula_escolar, nombres.toUpperCase(), genero, grado, seccion, id]);

        res.send('Estudiante actualizado');
    } catch (err) {
        console.log(err);
    }
}

//
const allUsuariosRegistrados = async (req, res) => {
    let longitudOfRegistros = await pool.query('SELECT * FROM personal ORDER BY nombre');
    let lastUser = longitudOfRegistros.rows[longitudOfRegistros.rows.length - 1].id // Obtener el ultimo usuario de la tabla BD.

    try {
        let valorInicial = +req.query.param;

        if (valorInicial > 0) {  // si esto es true el usuario quiere ver los siguientes o anteriores regs, segun el <<valorInicial>>
            const resBD = await pool.query('SELECT id, nombre, email, rol, cedula, area_personal FROM personal ORDER BY nombre OFFSET $1 LIMIT $2', [valorInicial, 4]);

            if (resBD.rows[resBD.rows.length - 1].id === lastUser) {
                resBD.rows[0].aviso = true; // se le notifica al front mediante esta propiedad que se estan mostrando los ultimos regs
                res.json(resBD.rows);

            } else {
                res.json(resBD.rows);
            }
        } else { // sino mostrar los primeros 10 regs.
            const resBD = await pool.query('SELECT claveuser, id, nombre, email, rol, cedula, area_personal FROM personal ORDER BY nombre OFFSET $1 LIMIT $2', [0, 4]);

            res.json(resBD.rows);
        }
    } catch (err) {
        console.log('err allUser', err.message);
    }
}

const getEstudiantebyCedula = async (req, res) => {
    let capitalizeName = '';

    try {
        const cedula = req.body.cedula.trim();
        const resBD = await pool.query('SELECT * FROM estudiante WHERE cedula_escolar = $1', [cedula]);

        if (resBD.rowCount === 0) {
            res.json({ error: 'No se ha podido encontrar al usuario, vuelve a intentarlo.' })
        } else {
            let lowercaseName = resBD.rows[0].nombres.toLowerCase().split(' ');

            for (const name of lowercaseName) { // se reemplaza la primera letra minuscula por mayuscula
                capitalizeName += ' ' + name.replace(name[0], name[0].toUpperCase());
            }
            resBD.rows[0].nombres = capitalizeName.trim();
            res.json(resBD.rows[0]);
        }

    } catch (err) {
        console.log(err.message);
    }
}


const eliminarRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const tablaName = req.query.tabla;

        await pool.query(`DELETE FROM ${tablaName} WHERE id = $1`, [id]);

        res.send('Registro eliminado');

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    registroEstudiante,
    registroUsuario,
    allUsuariosRegistrados,
    getEstudiantebyCedula,
    updateEstudiante,
    eliminarRegistro
}