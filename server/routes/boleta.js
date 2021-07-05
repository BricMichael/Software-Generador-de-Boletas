const { Router } = require('express');
const router = Router();

const { obtenerMaterias, InitialsFiveStudents, nextFiveStudents} = require('../controllers/boletaControllers');



router.get('/boletaMaterias', obtenerMaterias );
router.post('/boletaEstudiantes', InitialsFiveStudents);
router.post('/boletaNextEstudiantes', nextFiveStudents);







module.exports = router;

