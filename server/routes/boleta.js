const { Router } = require('express');
const router = Router();

const {  
    InitialsFiveStudents,
    nextFiveStudents, 
    indicadorEspecialistaByArea,
    creacionBoleta,
    modelFinalPagePdf, 
} = require('../controllers/boletaControllers');


router.get('/crearBoleta/:alumno', creacionBoleta);
router.get('/boleta/modelPDF', modelFinalPagePdf);
router.post('/boletaEstudiantes', InitialsFiveStudents);
router.post('/boletaNextEstudiantes', nextFiveStudents);
router.post('/boletaLiteral', indicadorEspecialistaByArea);



module.exports = router;

