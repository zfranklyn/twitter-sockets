var Express = require('Express');
var app = new Express();
var morgan = require('morgan');


// app.use(function(req, res, next){
//   console.log(req['method'] + " " + req['url']);
//   next();
// })

// app.use("/surgeryRoom/:bloody", function(req, res, next){
//   console.log("We're bleeding... Death is near...");
//   //next();
// })

app.use(morgan(':method :url :status'));


app.get("/", function(req, res, next) {
  console.log("server listening");
  res.sendStatus(200);
})


app.listen(3000);

