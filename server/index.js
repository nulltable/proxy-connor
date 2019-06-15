const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const port = process.env.PORT | 3000;
const publicDir = path.join(__dirname, '../public');

const app = express();

app.use(express.static(publicDir));
app.use('/:id/reviews', proxy('http://localhost:3010/:id/reviews'));
app.use('/:id/summary', proxy('http://localhost:3010/:id/summary'));

app.get('/:id', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public') + '/index.html')
});

app.listen(port, () => {
  console.log('Open Table proxy server listening on port 3000!');
});
