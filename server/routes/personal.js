const { Router } = require('express');
const router = Router();

const { mostrarRegistros, obtenerRegistroById, updateRegistro, 
deleteRegistro, registrarUsuario, validarUsuario} = require('../controllers/personalControllers');


router.get('/personal', mostrarRegistros);
router.post('/personalValidar', validarUsuario);
router.post('/personal', registrarUsuario);
router.get('/personal/:id', obtenerRegistroById);
router.put('/personal/:id', updateRegistro);
router.delete('/personal/:id', deleteRegistro);






module.exports = router;