const express =require('express');
const router = express.Router();
const {getTask, getTaskTypes} = require('../controller/taskController');

router.get('/', getTask);
router.get('/taskTypes', getTaskTypes);

module.exports = router;
