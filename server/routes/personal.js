const { Router } = require('express');
const router = Router();

const { validarUsuario , updatePersonal, updatePassword , getUserByCedula} = require('../controllers/personalControllers');


router.get('/personal/:cedula', getUserByCedula);
router.post('/personalValidar', validarUsuario);
router.put('/personal/:id', updatePersonal);
router.put('/personalPassword/:id', updatePassword);










module.exports = router;