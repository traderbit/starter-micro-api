const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const request = require('superagent');
const https = require('https');
const mime = require('mime');
const API = process.env.API;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/a', (req, res) => {
  res.send('Hello World!'+API)
})

app.get('/', (req, res) => {
    res.sendfile('./index.html');
});

app.get('/file/:file', function async(req, res) {
    const url = API+'/file/'+req.params.file;
        getContentTpeFromURL(url, (contentType) => {
        if (contentType) {
            res.setHeader('Content-Type', contentType);
            request(url).pipe(res);
        } else {
            res.json({ 'success': false });
        }
    });
});

app.get('/d/:file', function async(req, res) {
  try {
    const url = API+'/file/'+req.params.file;
        getContentTpeFromURL(url, async(contentType) => {
        if (contentType) {
            res.setHeader('Content-disposition', 'attachment; filename=' + req.params.file);
            res.setHeader('Content-Type', contentType);
            request(url).pipe(res);
        } else {
            res.json({ 'success': false });
        }
    });
  } catch (error) {
    res.send(error.message);
  }
});

app.post('/download', async(req, res) => {
  const { url } = req.body;
      try {
    const apiUrl = API+'/fetch/'+url;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

function getContentTpeFromURL(url, callback) {
    const protocol = https;

    protocol.get(url, (response) => {
        if (response.statusCode === 200) {
            const contentType = response.headers['content-type'];
            callback(contentType);
        } else {
            console.error(`Error: Status code ${response.statusCode}`);
            callback(null); // Return null in case of an error
        }
    }).on('error', (error) => {
        console.error('Error:', error.message);
        callback(null); // Return null in case of an error
    });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
