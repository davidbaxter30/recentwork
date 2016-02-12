var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080);

console.log('You are now up and running on http://localhost:8080/home-page/index.html');
console.log('Cntrl + C or Command C to exit')