const { Router } = require('express');
const router = Router();

const { guardarIndicador, updateIndicador, obtenerIndicadoresPorUsuario,
    allIndicadores , eliminarIndicador } = require('../controllers/indicadoresControllers');


router.post('/indicadores', guardarIndicador );
router.put('/indicadores/:id', updateIndicador);
router.get('/indicadoresUsuario', obtenerIndicadoresPorUsuario);
router.get('/indicadoresTotales', allIndicadores);
router.delete('/indicadores/:id', eliminarIndicador);





module.exports = router;