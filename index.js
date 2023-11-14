const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const mime = require('mime');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/a', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
    res.sendfile('./index.html');
});

app.get('/file/:file', function async(req, res) {
    const filePath = 'https://fobrcb-ip-103-38-69-232.tunnelmole.net/file/'+req.params.file;
    const contentType = mime.getType(filePath);
    res.setHeader('Content-Type', contentType);
    res.sendFile(filePath);
});

app.post('/download', async(req, res) => {
  const { url } = req.body;
      try {
    const apiUrl = 'https://fobrcb-ip-103-38-69-232.tunnelmole.net/fetch/'+url; // Replace with your API endpoint
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
