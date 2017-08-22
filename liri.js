
var inquirer = require('inquirer');
var request = require("request");

var fs = require("fs");
var keys = require("./keys.js");
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var params = { screen_name: 'almira1612', count: 20 };


inquirer
  .prompt([

  	   {
      type: "list",
      message: "Hi this is Liri, what can I do for you?",
      choices: ["My-tweets", "Spotify-this-song", "movie-this", "do-what-it-says"],
      name: "actions"
    }
  ])

.then(function(inquirerResponse) {
	
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.actions === "My-tweets") {
      myTweets();
    }
    else if (inquirerResponse.actions === "Spotify-this-song"){
     inquirer
        .prompt([
         {
      type: "input",
      message: "Type the song name here: ",
      name: "songName"
          } ])

      .then(function(userSong){
         
      	
      spotify(userSong.songName);

      });
     
    
    }
     else if (inquirerResponse.actions === "movie-this"){
      inquirer
        .prompt([
         {
      type: "input",
      message: "Type the movie name here: ",
      name: "movieName"
          } ])

      .then(function(userMovie){

      	
      movieThis(userMovie.movieName);

      });
    }
     else if (inquirerResponse.actions === "do-what-it-says"){
      doWhatSay();
    }
  });
// tweeter function
function myTweets(){
   var client = new twitter(keys.twitterKeys);
   
   client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
     
    }
  });
} // end myTweets function

// spotify function

//Client ID
//f6b5a62182af435b8bf6aeb6efd92f31
//Client Secret
//6e35f47012b244288f7deb518a6e3875
function spotify (songName){
  
  if (songName === undefined){
  	songName = "The Sign"
  }
	var spotify = new Spotify({
  id: "f6b5a62182af435b8bf6aeb6efd92f31",
  secret: "6e35f47012b244288f7deb518a6e3875"
});
	
	
	
	if (songName == null) {
    songName = 'The Sign';
  };

   //params = songName;
   spotify.search({ type:"track", query: songName}, function(err,data){
      if (!err) {
      	
      	var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
						var spotifyResults =
						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
						"Song: " + songInfo[i].name + "\r\n" +
						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
						"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
						"------------------------------ " + i + " ------------------------------" + "\r\n";
						console.log(spotifyResults);
						 
       }
    }
}
   else {
   	console.log(err);
   	return;
   }
   	});
} // end spotify function

 // movie function
 function movieThis(movieName){

 	
  var urlHit= "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
 if (movieName == null) {
    movieName = 'Mr Nobody';
  } 

 request(urlHit, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
      'Title: ' : jsonData.Title,
      'Year: ' : jsonData.Year,
      'IMDB Rating: ' : jsonData.imdbRating,
      'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
      'Country: ' : jsonData.Country,
      'Language: ' : jsonData.Language,
      'Plot: ' : jsonData.Plot,
      'Actors: ' : jsonData.Actors,

  });
      console.log(data);
     
}
  });
 } // end movieThis function

function doWhatSay() {
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				doWhatSayResults = data.split(",");
				spotify(doWhatSayResults[1], doWhatSayResults[2]);
			} else {
				console.log("Error occurred" + error);
			}
		});
	}; // end doWhatSay function