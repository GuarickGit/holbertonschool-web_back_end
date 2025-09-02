const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const databasePath = process.argv[2];
    let responseText = 'This is the list of our students\n';

    countStudents(databasePath)
      .then((data) => {
        responseText += data;
        res.end(responseText);
      })
      .catch((err) => {
        responseText += err.message;
        res.end(responseText);
      });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
