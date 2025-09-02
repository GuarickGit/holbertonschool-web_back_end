const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' });

  res.end('Hello Holberton School!');
});

const PORT = 1245;

app.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
