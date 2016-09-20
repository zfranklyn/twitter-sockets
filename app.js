var Express = require('Express');
var app = new Express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var tweetBank = require('./tweetBank.js');
var routes = require('./routes/');
var path = require('path');

// use these routes
app.use('/', routes);

app.use('/static', Express.static(path.join(__dirname, 'public')));

// app.use(function(req, res, next){
//   console.log(req['method'] + " " + req['url']);
//   next();
// })

// app.use("/surgeryRoom/:bloody", function(req, res, next){
//   console.log("We're bleeding... Death is near...");
//   //next();
// })

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

// app.get('/', function(req, res) {
//   res.render('index.html', localsVar);
// })

// app.get("/", function(req, res, next) {
  // console.log("server listening");
  // res.sendStatus(200);
// })

tweetBank.add("Sophia", "Hello Franklyn");
console.log(tweetBank.find({name: "Sophia"})[0]["content"]);



app.listen(3000);

