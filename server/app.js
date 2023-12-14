const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('ALMS Project');
});

app.get('/catalog', (req, res) => {
  res.send('Catalog page');
});

app.get('/login', (req, res) => {
  res.send('Login page');
});

app.get('/registration', (req, res) => {
  res.send('Registration page');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
