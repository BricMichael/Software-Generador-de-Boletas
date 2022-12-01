const { Router } = require('express');
const router = Router();

const { validarUsuario, updatePersonal, updatePassword, getUsers, cambiarClaveAdmin} = require('../controllers/personalControllers');


router.get('/personal/:prop', getUsers);
router.post('/personalValidar', validarUsuario);
router.put('/personal/claveAdmin', cambiarClaveAdmin);
router.put('/personal/:id', updatePersonal);
router.put('/personalPassword/:id', updatePassword);




module.exports = router;