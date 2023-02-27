const express =require('express');
const router = express.Router();
const {getKanban, addKanban, deleteKanban} = require('../controller/kanbanController');

router.route('/').get(getKanban).post(addKanban);
router.route('/:id').delete(deleteKanban);
module.exports = router;
