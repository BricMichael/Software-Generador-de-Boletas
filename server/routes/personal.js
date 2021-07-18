const { Router } = require('express');
const router = Router();

const { validarUsuario , updatePersonal, updatePassword , seePasswordUser} = require('../controllers/personalControllers');


router.get('/personal/:id', seePasswordUser);
router.post('/personalValidar', validarUsuario);
router.put('/personal/:id', updatePersonal);
router.put('/personalPassword/:id', updatePassword);










module.exports = router;