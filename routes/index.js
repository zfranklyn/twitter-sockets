var express = require('express');

var router = express.Router();

var tweetBank = require("../tweetBank");


router.get('/', function(req, res){
	var tweets = tweetBank.list();
	res.render('index', {tweets:tweets});

})

router.get('/stylesheets/:name', function(req, res){
	var fileName = req.params.name;

	var options = {
		root: __dirname + "/../public/stylesheets/"
	}

	// console.log("FILEPATH: ", options.root);
	// console.log("FILENAME: ", fileName);
	// console.log("FULL PATH: ", options.root+fileName);

	console.log("REQ PATH" ,req.path);

	res.sendFile(fileName, options, function(err){
		if (err) {
			// console.log(options.root);
			// console.log(err);
		} else {
			console.log("DELIVERED");
		}
	});
})

module.exports = router;