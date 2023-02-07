const express = require('express');
const router = express.Router();
const {transImage, transImage2, transImage3} = require('../controllers/openaiController');

router.post('/transimage',transImage);
router.post('/transimage2',transImage2);
router.post('/transimage3', transImage3);

module.exports = router;
  