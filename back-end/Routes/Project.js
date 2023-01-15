const express =require('express');
const router = express.Router();
const { getProject } = require('../controller/projectController');

router.get('/', getProject);

module.exports = router;
