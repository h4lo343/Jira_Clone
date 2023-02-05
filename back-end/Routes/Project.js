const express =require('express');
const router = express.Router();
const { getProject, updateProject, getProjectById, addProject } = require('../controller/projectController');

router.route('/').get(getProject).post(addProject);
router.route('/:id').patch(updateProject).get(getProjectById);

module.exports = router;
