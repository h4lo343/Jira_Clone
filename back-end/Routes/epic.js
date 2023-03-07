const express =require('express');
const router = express.Router();
const { getEpic, addEpic, deleteEpic } = require('../controller/epicController')


router.route('/').get(getEpic).post(addEpic);
router.route('/:id').delete(deleteEpic);

module.exports = router;
