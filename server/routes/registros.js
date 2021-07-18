const router = require('express').Router();

const { registroEstudiante, registroUsuario, allRegistrosUsuarios, getEstudiantebyCedula, updateEstudiante, eliminarRegistro, } = require('../controllers/registrosControllers');

router.get('/registroUsuarios', allRegistrosUsuarios);
router.post('/registroEstudiante', registroEstudiante);
router.post('/registroUsuario', registroUsuario);
router.post('/registroUnico', getEstudiantebyCedula);
router.put('/registro/:id', updateEstudiante);
router.delete('/registroEliminar/:id', eliminarRegistro);








module.exports = router;