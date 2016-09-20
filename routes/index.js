var express = require('express');

var router = express.Router();

var tweetBank = require("../tweetBank");

module.exports = function(io) {
	router.get('/', function(req, res){
		var tweets = tweetBank.list();
		res.render('index', {tweets:tweets, showForm: true});

	})

	router.get('/stylesheets/:name', function(req, res){
		var fileName = req.params.name;

		var options = {
			root: __dirname + "/../public/stylesheets/"
		}


		res.sendFile(fileName, options, function(err){
			if (err) {
				// console.log(options.root);
				// console.log(err);
			} else {
				console.log("DELIVERED");
			}
		});
	})

	router.get('/users/:name', function(req, res) {
	  var targetName = req.params.name;
	  console.log("HIT THIS", targetName);
	  var list = tweetBank.find({name: targetName});
	  console.log(list);
	  res.render( 'index', { tweets: list, showForm: true, name: targetName } );
	});


	router.get('/tweets/:id', function(req, res) {
		var matchingTweet = tweetBank.find( {id: parseInt(req.params.id)});
		res.render( 'index', {tweets: matchingTweet} );
	})

	router.post('/tweets', function(req, res) {
	  var name = req.body.name;
	  console.log(req.body.name);
	  var text = req.body.text;
	  tweetBank.add(name, text);
	  // res.redirect('/');
	  io.sockets.emit('newTweet', {name: name, text:text});
	});


	

	return router;
};


// module.exports = router;