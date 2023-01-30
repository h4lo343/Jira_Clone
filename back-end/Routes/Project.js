const express =require('express');
const router = express.Router();
const { getProject, updateProject } = require('../controller/projectController');

router.get('/', getProject);
router.route('/:id').patch(updateProject);

module.exports = router;
