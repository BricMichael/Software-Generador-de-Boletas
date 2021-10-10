const { Router } = require('express');
const router = Router();

const {
    initialsFiveStudents,
    indicadorEspecialistaByArea,
    creacionBoleta,
    modelFinalPagePdf,
    showFiveStudents,
    personalFirmas
} = require('../controllers/boletaControllers');


router.post('/boleta/crearBoleta', creacionBoleta);
router.get('/boleta/modelPDF', modelFinalPagePdf);
router.get('/boleta/firmasPersonal', personalFirmas);
router.post('/boletaEstudiantes', initialsFiveStudents);
router.post('/boletaShowEstudiantes', showFiveStudents);
router.post('/boletaLiteral', indicadorEspecialistaByArea);



module.exports = router;

