const express =require('express');
const router = express.Router();
const {getKanban} = require('../controller/kanbanController');

router.get('/', getKanban);

module.exports = router;
