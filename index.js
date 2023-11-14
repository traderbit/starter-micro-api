const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/a', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
    res.sendfile('./index.html');
});

app.post('/download', async(req, res) => {
  const { url } = req.body;
      try {
    const apiUrl = 'https://fobrcb-ip-103-38-69-232.tunnelmole.net/fetch/'+url; // Replace with your API endpoint
    const response = await axios.get(apiUrl);
    res.json(response);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
