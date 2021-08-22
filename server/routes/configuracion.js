const { Router } = require('express');
const router = Router();

const { guardarNuevaMateria, deleteAllStudents, obtenerMaterias, 
    consultaTotalStudents, deleteStudentsByGrado} = require('../controllers/configControllers');


router.get('/allMaterias', obtenerMaterias );
router.get('/allStudents', consultaTotalStudents);
router.post('/savedMateria', guardarNuevaMateria);
router.delete('/deleteByGrado/:grado', deleteStudentsByGrado);
router.delete('/truncateData', deleteAllStudents);


module.exports = router;