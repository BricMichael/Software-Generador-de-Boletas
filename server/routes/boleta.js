const { Router } = require('express');
const router = Router();

const { obtenerMaterias, fiveStudents } = require('../controllers/boletaControllers');



router.get('/boletaMaterias', obtenerMaterias );
router.get('/boletaEstudiantes', fiveStudents);







module.exports = router;

