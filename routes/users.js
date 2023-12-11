const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('users/login', { pageTitle: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('users/register', { pageTitle: 'Register' });
});

module.exports = router;