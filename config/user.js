/* Load the user model */
var mongoose = require('mongoose');
var userSchema = require("../models/user");
var db = require("../models/dbConnection")

/* Create each of the models that we will be adding to the database */
var User = db.User.model('User', userSchema);

this.get = function(req, res, tokenid, done) {

	User.findOne({'tokenid': tokenid}, function(err, user) {
		if(err)
			throw err;
		if (user == undefined) {

			/* Create a new user if that user does not exist */
			var user = new User();
			user.tokenid = tokenid;
			user.highscore = [];
			
			user.save(function(err) {
				if(err)
					throw err;
				else {
					done(req, res, user);
				}
			});
		}
		/* Just return the user if they exist */ 
		else {
			done(req, res, user);
		}
	});	
};


this.addHighScore = function(req, res, tokenid, level, score, done) {

	User.findOne({'tokenid': tokenid}, function(err, user) {
		var current_index = user.highscore.indexOf('level' + level);
		if(current_index == -1) {
			user.highscore.push('level' + level);
			user.highscore.push(score);
		}
		else {
			var current_score = user.highscore[current_index + 1];
			if(parseInt(current_score) < parseInt(score)) 
				user.highscore[current_index + 1] = score;
		}
		user.save(function(err) {
			if(err)
				throw err;
			else {
				console.log("Added: " + user);
				done(req, res, user);
			}
		});
	});
};


this.getHighScore = function(req, res, tokenid, level, done) {

	User.findOne({'tokenid': tokenid}, function(err, user) {

		if(err)
			throw err;
		else {
			var highscore = 0;
			var index = user.highscore.indexOf('level' + level);
			if(index != -1)
				highscore = user.highscore[index + 1];

			done(req, res, highscore);
		}
	});
};