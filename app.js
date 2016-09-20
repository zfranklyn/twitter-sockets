var Express = require('Express');
var app = new Express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var tweetBank = require('./tweetBank.js');
var routes = require('./routes/');
var path = require('path');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var server = app.listen(3000);
var io = socketio.listen(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use these routes yo
app.use('/', routes(io));

app.use('/static', Express.static(path.join(__dirname, 'public')));

app.use(morgan(':method :url :status'));

nunjucks.configure('views', {
  autoescape: true,
  noCache: true,
  express: app
})

app.set('view engine', 'html');
app.engine('html', nunjucks.render);


var localsVar = {
  title: "The Bleeding Operating Room",
  people: [
    {"name" : "Scalpel"},
    {"name" : "Oxygen Deprivations"}
    ]
}




