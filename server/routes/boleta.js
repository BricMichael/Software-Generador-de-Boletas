const { Router } = require('express');
const router = Router();

const {  
    InitialsFiveStudents,
    nextFiveStudents, 
    indicadorEspecialistaByArea 
} = require('../controllers/boletaControllers');


router.post('/boletaEstudiantes', InitialsFiveStudents);
router.post('/boletaNextEstudiantes', nextFiveStudents);
router.post('/boletaLiteral', indicadorEspecialistaByArea);







module.exports = router;

