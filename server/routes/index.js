const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to ALMS API!');
});



module.exports = router;
