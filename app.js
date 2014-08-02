var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index-controller.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

app.post('/translate', indexController.translate);

app.get('/quizPage', indexController.quizPage);

app.post('/quizSubmit', indexController.quizSubmit);

// app.get('/result', indexController.quizSubmit);

var server = app.listen(3863, function() {
	console.log('Express server listening on port ' + server.address().port);
});
