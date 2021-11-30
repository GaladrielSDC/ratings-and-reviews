const express = require('express');

// Middleware
var cors = require('cors');
const bodyParser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 8000);

// Logging and parsing
app.use(cors());
app.use(bodyParser.json());

// Set up our routes
app.use('/api/reviews', router);
// app.get('/api/reviews', (req, res) => {
//   console.log('what request looks like:', req.query);
//   res.send('Hello from the server')
// })
// Serve the client files
// app.use(express.static(__dirname + '/../client'));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
