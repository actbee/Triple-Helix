const express = require('express');
const router = express.Router();
const {transImage} = require('../controllers/openaiController');

router.post('/transimage',transImage);

module.exports = router;
  