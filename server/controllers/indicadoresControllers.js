const pool = require ('../configDB/poolConfig');
const sgMail = require('@sendgrid/mail');



const guardarIndicador = async (req, res ) => {
    try {
        const { indicador, literal, area, momento, condicion_especial, 
            grado, anio, idUser } = req.body;

        await pool.query(`INSERT INTO indicador (indicador, momento, area, condicion_especial, id_creador, grado, literal, fecha_creacion) VALUES( $1, $2, $3, $4, $5, $6, $7, $8 )`, [indicador, momento, area, condicion_especial, idUser, grado, literal, anio]);
     
        res.status(201).send('Indicador guardado exitosamente');        
    } catch (err) {
        console.log(err.message); 
    }
}

const obtenerIndicadoresPorUsuario = async(req, res) => {
    const year = new Date().getFullYear();
    try {
        const { momento, id } = req.body;

        const indicadoresUsuario = await pool.query(`SELECT * FROM indicador WHERE id_creador = $1 AND momento = $2 AND fecha_creacion = $3`, [id, momento, year]);

        res.status(200).json(indicadoresUsuario.rows);

    } catch (err) {
        console.log(err.message);
    }
}

const allIndicadores = async(req, res) => {
    try {
        const resBD = await pool.query('SELECT * FROM indicador');
        res.status(201).json(resBD.rows);

    } catch (err) {
        console.log(err.message);
    }
}

const updateIndicador = async (req, res) => {
    try {
        const { id } = req.params;
        const { indicador, literal, area, momento, condicion_especial, grado } = req.body;
        
        await pool.query(
            `UPDATE indicador SET indicador = $1, literal = $2, area = $3, condicion_especial = $4,
            grado = $5, momento = $6 WHERE id = $7`, [indicador, literal, area, condicion_especial,  
                 grado, momento, id] );
        
            res.status(201).send('Los datos han sido actualizados');

    } catch (err) {
        console.log(err.message);
    }
}

const comentariosEmail = (req, res) => {
    sgMail.setApiKey('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');
    const { comentario, nameUser, emailDestinatario } = req.body;

    const msg = {
        to: [ emailDestinatario ],
        from: 'colegioindicadores@gmail.com',
        subject: `Correcciones del coordinador ${nameUser}`,
        html: `
            <h2>Coordinador: ${ nameUser }</h2>
            <h3>Correciones del indicador</h3>
            <span style='color:black'>${ comentario }</span>         
         `   
    }
    sgMail.send( msg, (err) => {
        if( err ){
           console.log( err.message )
        } else {
            res.send(`Correo enviado a ${msg.to}`)
        } 
    }) 
}

const eliminarIndicador = async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM indicador WHERE id = $1', [id]);
        res.status(201).send('Se ha eliminado exitosamente');
        
    } catch (err) {
        console.log(err.message)
    }
}




module.exports = {
    guardarIndicador,
    obtenerIndicadoresPorUsuario,
    allIndicadores,
    updateIndicador,
    comentariosEmail,
    eliminarIndicador,
}