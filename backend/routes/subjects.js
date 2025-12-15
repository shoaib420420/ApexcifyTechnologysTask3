const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');
const { getSubjects, createSubject, updateSubject, deleteSubject } = require('../controllers/subjectController');

router.get('/', auth, getSubjects);
router.post('/', auth, allowRoles('Admin', 'Teacher'), createSubject);
router.put('/:id', auth, allowRoles('Admin', 'Teacher'), updateSubject);
router.delete('/:id', auth, allowRoles('Admin'), deleteSubject);

module.exports = router;
