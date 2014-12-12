/* Load what we need */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Define the schema for our model */
var highScoreSchema = mongoose.Schema({

		level1:		[String],
		level2: 	[String]
});

/* Create the model for users and expose it to the app */
module.exports = mongoose.model('HighScore', highScoreSchema);
