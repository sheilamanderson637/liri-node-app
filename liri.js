// Keys
var twitter = require('twitter');
var keys = require('./keys.js');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

// Arguments
var userCommand = process.argv[2];
var userInput = process.argv[3];

// Handles multiple word titles for movies and songs
    for(i=4; i<process.argv.length; i++){
	    userInput += '+' + process.argv[i];
    }   

    switch (userCommand) {

        case "my-tweets":
            retrieveTweets();
        break;

        case "spotify-this-song":
            searchSpotify();
        break;

        case "movie-this":
            omdbSearch();
        break;

        case "do-what-it-says":
            accessTextFile();
        break;
    }


function retrieveTweets() {

    var client = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
// Show last 20 tweets
    var params = {
        screen_name: 'akamom123',
        count: 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log('Error');
        } else {
            for (i = 0; i < tweets.length; i++) {
                var displayTweets = ("@akamom123" + '\n' + tweets[i].created_at + '\n' +  tweets[i].text);
                console.log("");
                console.log(displayTweets);
                
                console.log("=============================================================================");
                
            }
        };
    });
};

function searchSpotify() {
    var songSearch;
        if (userInput === undefined) {
            songSearch = "The Sign"

        } else {
            songSearch = userInput;
        } 

    spotify.search({type: 'track', query:songSearch}, function(err, data) {    
        if (err) {        
            console.log('Error occurred: '  +  err);  
         
    } else {
        console.log("");
        console.log("========================  Song Information  ====================================");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("================================================================================");
        console.log("");                 
        }
    })
};

function omdbSearch() {

    var movieTitle;
    if (userInput === undefined) {
        movieTitle = "Mr. Nobody";
    } else {
        movieTitle = userInput;
    };

    var url = 'http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=long&tomatoes=true&r=json&apikey=40e9cece';

    request(url, function(error, response, body) {
        if (error) {
            console.log("Error");
        } else {
            
            console.log("");
            console.log("========================  Movie Information  ===============================");
            console.log("Title: " + JSON.parse(body)["Title"]);
            console.log("Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Country: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
            console.log("============================================================================");
            console.log("");
        }
    });
};

function accessTextFile(){
	fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    });
};
