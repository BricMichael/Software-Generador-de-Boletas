const { Router } = require('express');
const router = Router();

const { obtenerMaterias, 
    InitialsFiveStudents,
    nextFiveStudents, 
    indicadorEspecialistaByArea } = require('../controllers/boletaControllers');



router.get('/boletaMaterias', obtenerMaterias );
router.post('/boletaEstudiantes', InitialsFiveStudents);
router.post('/boletaNextEstudiantes', nextFiveStudents);
router.post('/boletaLiteral', indicadorEspecialistaByArea);







module.exports = router;

