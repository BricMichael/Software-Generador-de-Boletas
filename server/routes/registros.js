const router = require('express').Router();

const { registroEstudiante, registroUsuario, allUsuariosRegistrados, getEstudiantebyCedula, updateEstudiante, eliminarRegistro, } = require('../controllers/registrosControllers');

router.get('/registroUsuarios', allUsuariosRegistrados);
router.post('/registroEstudiante', registroEstudiante);
router.post('/registroUsuario', registroUsuario);
router.post('/registroStudent', getEstudiantebyCedula);
router.put('/registro/:id', updateEstudiante);
router.delete('/registroEliminar/:id', eliminarRegistro);








module.exports = router;