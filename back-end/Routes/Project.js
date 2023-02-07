const express =require('express');
const router = express.Router();
const { getProject, updateProject, getProjectById, addProject, deleteProjectById } = require('../controller/projectController');

router.route('/').get(getProject).post(addProject);
router.route('/:id').patch(updateProject).get(getProjectById).delete(deleteProjectById);

module.exports = router;
