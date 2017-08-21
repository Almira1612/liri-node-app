
var inquirer = require('inquirer');
var request = require("request");

var fs = require("fs");
var keys = require("./keys.js");
var twitter = require('twitter');
//var spotify = require('spotify');
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
     spotify();
    }
     else if (inquirerResponse.actions === "movie-this"){
      movieThis();
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
};
// spotify function

//Client ID
//f6b5a62182af435b8bf6aeb6efd92f31
//Client Secret
//6e35f47012b244288f7deb518a6e3875
// function spotify (songName){
// 	var songName = process.argv[3];
// 	if (songName === undefined){
// 		console.log("Undefined, Please try again!");
// 	};
//    params = songName;
//    spotify.search({ type:"track", query: params}, function(err,data){
//       if (!err) {
//       	var songInfo = data.tracks.items;
// 				for (var i = 0; i < 5; i++) {
// 					if (songInfo[i] != undefined) {
// 						var spotifyResults =
// 						"Artist: " + songInfo[i].artists[0].name + "\r\n" +
// 						"Song: " + songInfo[i].name + "\r\n" +
// 						"Album the song is from: " + songInfo[i].album.name + "\r\n" +
// 						"Preview Url: " + songInfo[i].preview_url + "\r\n" + 
// 						"------------------------------ " + i + " ------------------------------" + "\r\n";
// 						console.log(spotifyResults);
// 						log(spotifyResults); // calling log function
//        }
//     }
// }
//    else {
//    	console.log(err);
//    	return;
//    }
//    	});



//  };

//  // movie function
//  function movieThis(){
//   var movie = process.argv[3];
//  }
