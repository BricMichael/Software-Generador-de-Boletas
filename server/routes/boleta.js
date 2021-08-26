const { Router } = require('express');
const router = Router();

const {  
    InitialsFiveStudents,
    nextFiveStudents, 
    indicadorEspecialistaByArea,
    creacionBoleta
} = require('../controllers/boletaControllers');


router.get('/crearBoleta', creacionBoleta);
router.post('/boletaEstudiantes', InitialsFiveStudents);
router.post('/boletaNextEstudiantes', nextFiveStudents);
router.post('/boletaLiteral', indicadorEspecialistaByArea);







module.exports = router;

