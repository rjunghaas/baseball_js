var mongoose = require('mongoose');

// Defining MongoDB schema
var baseballSchema = mongoose.Schema({
	name: String,
	id: Number
},{collection: 'baseballDB'});

// Connecting to MongoDB database
var dbURI = 'mongodb://127.0.0.1:27017/baseballDB';
var BaseballDB = mongoose.model('baseballDB', baseballSchema, 'baseballDB');
mongoose.connect(dbURI);

// When successfully connected
mongoose.connection.on('connected', function () {
	console.log('Mongoose default connection open to ' + dbURI);
});
	 
// If the connection throws an error
mongoose.connection.on('error',function (err) {
	console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose default connection disconnected');
});

// Search function for player name and id
exports.playerSearch = function (err, search_str, res) {
	if(err) console.log(err);
	var self = res;
	
	BaseballDB.findOne({ name: new RegExp(search_str, "i") }, function(err, players) {
		// When no search results found, returns "??"
		if(!players){
			json_result = {name: "??", id: "??"};
			self.writeHead(200, {"Content-Type": "application/json"});
   	 		var output = { error: "No search results", data: json_result };
   	 		self.end(JSON.stringify(output) + "\n");
		// returns search results
		} else {
			json_result = {name: players.name, id: players.id};
			self.writeHead(200, {"Content-Type": "application/json"});
   	 		var output = { error: null, data: json_result };
   	 		self.end(JSON.stringify(output) + "\n");
		}
	});
};