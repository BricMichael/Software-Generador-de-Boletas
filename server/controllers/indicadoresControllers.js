const pool = require('../configDB/poolConfig');
const sgMail = require('@sendgrid/mail');


const guardarIndicador = async (req, res) => {
    try {
        const { 
            indicador, 
            proposito_general, 
            literal, 
            area, // area sirve las especialidades
            momento, 
            condicion_especial,
            grado, 
            nombre_docente,
            id_creador
        } = req.body;

        const checkPropostioGeneral = proposito_general ? proposito_general : null;
        await pool.query(`INSERT INTO indicador (indicador, proposito_general, momento, area, condicion_especial, grado, literal, nombre_docente, id_creador ) 
        VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9 )`, [indicador,checkPropostioGeneral, momento, area, condicion_especial, grado, literal, nombre_docente, id_creador]);
        res.status(201).send('Indicador guardado exitosamente');
    } catch (err) {
        console.log(err.message);
    }
}

const updateIndicador = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            indicador, 
            proposito_general, 
            literal, 
            area, // area sirve las especialidades
            momento, 
            condicion_especial,
            grado, 
        } = req.body;

        await pool.query(
            `UPDATE indicador SET indicador = $1, literal = $2, area = $3, condicion_especial = $4,
            grado = $5, momento = $6, proposito_general = $7 WHERE id = $8`, [indicador, literal, area, condicion_especial,
            grado, momento, proposito_general, id]
        );
        res.status(201).send('Los datos han sido actualizados');
    } catch (err) {
        console.log(err.message);
    }
}

const obtenerIndicadoresPorUsuario = async (req, res) => {
    try {
        const { momento, id_creador, grado } = req.body;
        const indicadoresUsuario = await pool.query(`SELECT * FROM indicador WHERE id_creador = $1 AND momento = $2 AND grado = $3`, [id_creador, momento, grado]);

        res.status(200).json(indicadoresUsuario.rows);
    } catch (err) {
        console.log(err.message);
    }
}

const eliminarIndicador = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM indicador WHERE id = $1', [id]);
        res.status(201).send('Se ha eliminado exitosamente');
    } catch (err) {
        console.log(err.message)
    }
}

const comentariosEmail = async (req, res) => {
    sgMail.setApiKey('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');
    const { comentario, nameUser, emailDestinatario } = req.body;

    const msg = {
        to: [emailDestinatario],
        from: 'colegioindicadores@gmail.com',
        subject: `Correcciones del coordinador ${nameUser}`,
        html: `
            <h2>Coordinador: ${nameUser}</h2>
            <h3>Correciones del indicador</h3>
            <span style='color:black'>${comentario}</span>         
         `
    }
    const ver = await sgMail.send(msg, (err) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(`Correo enviado a ${msg.to}`)
        }
    })
    console.log(ver)
}


module.exports = {
    guardarIndicador,
    obtenerIndicadoresPorUsuario,
    updateIndicador,
    comentariosEmail,
    eliminarIndicador,
}