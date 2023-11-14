const express = require('express');
const app = express();
const port = 3000;

app.get('/a', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
    res.sendfile('./index.html');
});

app.post('/download', (req, res) => {
  console.log(res);
    res.json({'success' : true});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
