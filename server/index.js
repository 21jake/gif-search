const express = require('express');

const app = express();

app.listen(process.env.PORT || 8080, (err) => {
  if (err) throw err;
  console.log('Server start');
});

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.send(__dirname + '/build/index.html');
});
