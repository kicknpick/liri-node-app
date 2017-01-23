
// function to run spotify command
var runSpotify = function() {
	// adding the name of the song into variable spotifySong
	var spotifySong = "";
	for (var i = 3; i < process.argv.length; i++) {
		spotifySong = spotifySong + process.argv[i] + " ";
		spotifySong = spotifySong.trim();
		console.log(spotifySong);
	};
	// searching spotify for spotifySong 
	var spotify = require('spotify');
 
	spotify.search({ type: 'track', query: spotifySong }, function(err, data) {
    	if ( err ) {
		    console.log('Error occurred: ' + err);
		    return;
    	} else {
    		console.log(data);

    	}
	})
};

// function to run OMDB search command
var runMovie = function() {
	// requiring request for OMDB API
	var request = require('request');
	
	// get user input for movie title 
	var movieTitle = "";
	for (var i = 3; i < process.argv.length; i++) {
		movieTitle = movieTitle + process.argv[i] + " ";
	};
	console.log(movieTitle);

	// trim down movieTitle
	movieTitle = movieTitle.trim();
	console.log(movieTitle);

	// creating OMDB API variable
	var movieAPI = 'http://www.omdbapi.com/?t=' + movieTitle + '&r=json';

	// making request to OMDB API
	request(movieAPI, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(response.body);
	    var movie = JSON.parse(body); 
	  }
	});
};


// if/else if statement to receive one of the four liri commands(movie-this, spotify-this-song, do-what-it-says, my-tweets)
// beginning of OMDB command
if (process.argv[2] === "movie-this") {
	
	runMovie();
	
// beginning of spotify-this-song command
} else if (process.argv[2] === "spotify-this-song") {
	
	runSpotify();	

} else if (process.argv[2] === "do-what-it-says") {
	// requiring FS node package
	var fs = require("fs");

	//reading the random.txt file
	fs.readFile("random.txt", "utf8", function(error, data) {
		console.log(data.split());
		var randomArray = data.split(",");
		var randomSong = randomArray[1];
		console.log(randomSong);

	
		// searching spotify for spotifySong 
		var spotify = require('spotify');
	 
		spotify.search({ type: 'track', query: randomSong }, function(err, data) {
	    	if ( err ) {
			    console.log('Error occurred: ' + err);
			    return;
	    	} else {
	    		console.log(data);

	    	}
		});
	});
// beginning of twitter command
} else if (process.argv[2] === "my-tweets") {

	// use fs node package to read keys.js file
	var keys = require("./keys");
	console.log(keys.twitterKeys);
	var myTwitterKeys = keys.twitterKeys;

	// use twitter node pacakge 
	var Twitter = require("twitter");

	var client = new Twitter(myTwitterKeys);

	var params = {screen_name: 'node_js'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  } else {
	  	console.log("error");
	  }
	});
};










