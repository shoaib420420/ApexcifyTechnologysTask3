const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const allowRoles = require('../middleware/roles');
const { createExam, getExams, updateExam, deleteExam } = require('../controllers/examsController');

// Create exam (teacher/admin)
router.post('/', auth, allowRoles('Teacher', 'Admin'), createExam);

// Get exams (student/teacher/admin)
router.get('/', auth, allowRoles('Student', 'Teacher', 'Admin'), getExams);

// Update exam (teacher/admin)
router.put('/:id', auth, allowRoles('Teacher', 'Admin'), updateExam);

// Delete exam (teacher/admin)
router.delete('/:id', auth, allowRoles('Teacher', 'Admin'), deleteExam);

module.exports = router;
