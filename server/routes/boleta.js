const { Router } = require('express');
const router = Router();

const {
    initialsFiveStudents,
    indicadorEspecialistaByArea,
    creacionBoleta,
    modelFinalPagePdf,
    showFiveStudents,
    personalFirmas,
    getBoletaByStudentAndId,
    generarBoletaExistente
} = require('../controllers/boletaControllers');


router.post('/boleta/crearBoleta', creacionBoleta);
router.get('/boleta/modelPDF', modelFinalPagePdf);
router.post('/boleta/getById', getBoletaByStudentAndId);
router.post('/boleta/existente', generarBoletaExistente);
router.get('/boleta/firmasPersonal', personalFirmas);
router.post('/boletaEstudiantes', initialsFiveStudents);
router.post('/boletaShowEstudiantes', showFiveStudents);
router.post('/boletaLiteral', indicadorEspecialistaByArea);



module.exports = router;

