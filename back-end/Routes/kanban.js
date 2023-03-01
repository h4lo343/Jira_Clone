const express =require('express');
const router = express.Router();
const {getKanban, addKanban, deleteKanban, reorder} = require('../controller/kanbanController');

router.route('/').get(getKanban).post(addKanban);
router.route('/:id').delete(deleteKanban);
router.post('/reorder', reorder);
module.exports = router;
