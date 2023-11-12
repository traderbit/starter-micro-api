const express = require('express');
const app = express();
const port = 3000;
const JSONdb = require('simple-json-db');
const db = new JSONdb('./config.json');

app.get('/', (req, res) => {
  db.set('key', 'value');
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
