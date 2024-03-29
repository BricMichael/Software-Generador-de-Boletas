const { Router } = require('express');
const router = Router();

const { guardarIndicador, updateIndicador, obtenerIndicadoresPorUsuario,
    comentariosEmail, eliminarIndicador } = require('../controllers/indicadoresControllers');


router.post('/indicadores', guardarIndicador);
router.put('/indicadores/:id', updateIndicador);
router.post('/indicadoresUsuario', obtenerIndicadoresPorUsuario);
router.post('/indicadoresEmail', comentariosEmail);
router.delete('/indicadores/:id', eliminarIndicador);





module.exports = router;