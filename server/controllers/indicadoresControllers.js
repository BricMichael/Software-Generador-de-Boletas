const pool = require ('../configDB/poolConfig');
const { response } = require('express');


const guardarIndicador = async (req, res = response ) => {
    try {

        const { descripcion, literal, area, 
            condicionEspecial, fechaCreacion, usuario} = req.body;
        
        await pool.query(
            `INSERT INTO indicador( descripcion, literal, area, 
                condicion_especial, fecha_creacion, creador_personal )
                VALUES( $1, $2, $3, $4, $5, $6 )`, [descripcion, literal, area, 
                condicionEspecial, fechaCreacion, usuario] );

        res.status(201).send('Indicador guardado satisfactoriamente');        
    } catch (err) {
        console.log(err.message);
    }
}

const obtenerIndicadoresPorUsuario = async(req, res) => {
    try {
        const nombrePersonal = req.body.usuario;

        const IndicadoresUsuario = await pool.query('SELECT * FROM indicador WHERE creador_personal = $1', [nombrePersonal]);

        res.status(200).json(IndicadoresUsuario.rows)


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
        const { descripcion, literal, area, condicionEspecial } = req.body;
        
        await pool.query(
            `UPDATE indicador SET descripcion = $1, literal = $2, area = $3, condicion_especial = $4
                WHERE id_indicador = $5`, [descripcion, literal, area, 
                condicionEspecial, id] );
        
            res.status(201).send('Los datos han sido actualizados');

    } catch (err) {
        console.log(err.message);
    }
}

const eliminarIndicador = async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM indicador WHERE id_indicador = $1', [id]);
        res.status(201).send('Se ha eliminado exitosamente');
        
    } catch (err) {
        console.log(err.message)
    }
}




module.exports = {
    guardarIndicador,
    obtenerIndicadoresPorUsuario,
    allIndicadores,
    eliminarIndicador,
    updateIndicador
}