// models/user.js

/* Get mongodb address and port from env if using docker, or
 * default to '+ address + ':' + port + ':27017 */
var process = require('process');
var address = process.env.MONGODB_PORT_27017_TCP_ADDR;
var port = process.env.MONGODB_PORT_27017_TCP_PORT;
address = (address == undefined)? "localhost" : address;
port = (port == undefined)? "27017" : port;
var mongoose = require('mongoose')

/* Define our DB object which holds all our connections. Only need
 * to create the connections once */
var db = {
	HighScore : mongoose.connection,
	User: mongoose.connection,
}

/* Create our connections */
//db.HighScore = mongoose.createConnection('mongodb://'+ address + ':' + port + '/highscore');
//db.User = mongoose.createConnection('mongodb://'+ address + ':' + port + '/user');
db.HighScore = mongoose.createConnection('mongodb://casenh:casenH@ds063240.mongolab.com:63240/heroku_app32085538/highscore');
db.User = mongoose.createConnection('mongodb://casenh:casenH@ds063240.mongolab.com:63240/heroku_app32085538/user');

/* Create the model for users and expose it to the app */
module.exports = db
