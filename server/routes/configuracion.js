const { Router } = require('express');
const router = Router();

const { guardarNuevaMateria, deleteAllStudents, obtenerMaterias,
    consultaTotalStudents, deleteStudentsByGrado, totalUsersByRol } = require('../controllers/configControllers');


router.get('/config/allMaterias', obtenerMaterias);
router.get('/config/allStudents', consultaTotalStudents);
router.get('/config/totalUserByRol', totalUsersByRol);
router.post('/config/savedMateria', guardarNuevaMateria);
router.delete('/config/deleteByGrado/:grado', deleteStudentsByGrado);
router.delete('/config/truncateData', deleteAllStudents);


module.exports = router;