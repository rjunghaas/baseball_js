// Loading required libraries
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser'); // for parsing API parameters
var request = require('request');
var mongoose = require('mongoose');

// Loading helper javascripts
var helpers = require('./helpers/helpers.js');
var db = require('./models/model.js');

// Defining routes
app.use(express.static(__dirname + "/../static")); // Directory for static content
app.use("/libs", express.static(__dirname + "/../libs")); // Directory for Angular libraries
app.use("/js", express.static(__dirname + "/js")); // Directory for front-end code
app.use(bodyParser.json());

// Load single page
app.get('/players/index', function(req, res){
    res.header('Content-Type', 'text/html');
    res.sendfile("basic.html");
});

// Handles post request for search request
app.post('/players/search', function(req,res) {
	var search_str = req.body.search_str;
	db.playerSearch(null, search_str, res);
});

// Handles post request for requesting website, scraping it, and calculating VORP.
app.post('/players/scrape', function(req,res){
	var start_date_str = String(req.body.start_date);
	var end_date_str = String(req.body.end_date);
	var player = req.body.name;
	var id = req.body.id;
	
	var start_date = helpers.parseDate(start_date_str);
	var end_date = helpers.parseDate(end_date_str);
	
	var url = "http://www.baseballmusings.com/cgi-bin/PlayerInfo.py?StartDate=" + start_date + "&EndDate=" + end_date + "&GameType=all&PlayedFor=0&PlayedVs=0&Park=0&PlayerID=" + id;
	var self = res; //preserve pointer to res
	
	request(url, function(err, res, html){
		if(err) return console.error(err);
		
		result = helpers.parsePage(html);
		vorp = helpers.calcVorp(result);
		
		var json_result = {
			"player_name": player,
			"start_date": start_date_str,
			"end_date": end_date_str,
			"VORP": vorp
		};
	
		self.writeHead(200, {"Content-Type": "application/json"});
   	 	var output = { error: null, data: json_result };
   	 	self.end(JSON.stringify(output) + "\n");
	});	
});

// Redirect function to load single page
app.get('/', function(req, res){
	res.redirect("/players/index");
	res.end();
});

app.listen(8080);