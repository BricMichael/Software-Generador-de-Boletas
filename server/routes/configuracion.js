const { Router } = require('express');
const router = Router();

const { guardarNuevaMateria } = require('../controllers/configControllers');

router.post('/savedMateria', guardarNuevaMateria);



module.exports = router;