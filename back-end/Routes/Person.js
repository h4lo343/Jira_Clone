const express =require('express');
const router = express.Router();
const { getAllPerson } = require('../controller/personController');

router.get('/', getAllPerson);

module.exports = router;
