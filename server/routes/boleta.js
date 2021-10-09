const { Router } = require('express');
const router = Router();

const {
    initialsFiveStudents,
    nextFiveStudents,
    indicadorEspecialistaByArea,
    creacionBoleta,
    modelFinalPagePdf,
    showFiveStudents
} = require('../controllers/boletaControllers');


router.post('/boleta/crearBoleta', creacionBoleta);
router.get('/boleta/modelPDF', modelFinalPagePdf);
router.post('/boletaEstudiantes', initialsFiveStudents);
router.post('/boletaShowEstudiantes', showFiveStudents);
router.post('/boletaLiteral', indicadorEspecialistaByArea);



module.exports = router;

