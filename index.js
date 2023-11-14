const express = require('express');
const app = express();
const port = 3000;

app.get('/a', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
    fs.readFile(__dirname + './index.html', 'utf8', (err, text) => {
        res.send(text);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
