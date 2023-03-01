const express =require('express');
const router = express.Router();
const {getTasks, getTaskTypes, addTask, getTask, updateTask, deleteTask, reorder } = require('../controller/taskController');



router.route('/').get(getTasks).post(addTask);
router.get('/taskTypes', getTaskTypes);
router.post('/reorder', reorder);
router.route('/:id').get(getTask ).patch(updateTask).delete(deleteTask);

module.exports = router;
