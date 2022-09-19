var express = require('express');
var app = express();
var path = require('path');
var port = 8080;

var bodyParser = require('body-parser');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/scripts'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/error.html'));
});

app.get('/visasso', function(req, res) {
		res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.listen(port, () => console.log(`Serving on port ${port}`));
