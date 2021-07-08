const { Router } = require('express');
const router = Router();

const { obtenerMaterias, InitialsFiveStudents, nextFiveStudents, 
    indicadoresEspecialistaBoleta} = require('../controllers/boletaControllers');



router.get('/boletaMaterias', obtenerMaterias );
router.post('/boletaEstudiantes', InitialsFiveStudents);
router.post('/boletaNextEstudiantes', nextFiveStudents);
router.post('/boletaLiteral', indicadoresEspecialistaBoleta);







module.exports = router;

