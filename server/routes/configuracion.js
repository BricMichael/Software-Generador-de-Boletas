const { Router } = require('express');
const router = Router();

const { guardarNuevaMateria, deleteAllStudents, obtenerMaterias } = require('../controllers/configControllers');


router.get('/allMaterias', obtenerMaterias );
router.post('/savedMateria', guardarNuevaMateria);
router.delete('/truncateData', deleteAllStudents);


module.exports = router;