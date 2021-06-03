const { Router } = require('express');
const router = Router();

const { mostrarRegistros, registroById , updateRegistro, deleteRegistro, registrarUsuario} = require('../controllers/personalControllers');


router.get('/personal', mostrarRegistros);
router.post('/personal', registrarUsuario)
router.get('/personal/:id', registroById);
router.put('/personal/:id', updateRegistro)
router.delete('/personal/:id', deleteRegistro)






module.exports = router;