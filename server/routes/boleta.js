const { Router } = require('express');
const router = Router();

const { obtenerMaterias, fiveStudents } = require('../controllers/boletaControllers');



router.get('/boletaMaterias', obtenerMaterias );
router.post('/boletaEstudiantes', fiveStudents);







module.exports = router;

