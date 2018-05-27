var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var db = require('./database.js'); //link up to DB
var axios = require('axios'); //require axios
var {API_KEY} = require('./config.js'); //link up API key
var apiHelpers = require('./apiHelpers.js');

app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function(req, res) {
  // get the search genre     
  // https://www.themoviedb.org/account/signup
  // use this endpoint to search for movies by genres, you will need an API key
  // https://api.themoviedb.org/3/discover/movie
  // and sort them by horrible votes using the search parameters in the API
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&with_genres=28`)
  .then((data) => {
    console.log('getting from API', data.data.results);
    res.send(data.data.results);
    })
  .catch((err) => console.log('error querying API', err));
});

app.get('/genres', function(req, res) {
  // make an axios request to get the list of official genres
  // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
  // send back
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
  .then((data) => {
    console.log('getting list of genres from API', data.data.genres);
    res.send(data.data.genres);
  })
  .catch((err) => console.log('error querying API for list of genres', err));
});

app.post('/save', function(req, res) {
  
  db.save();
});

app.post('/delete', function(req, res) {

});



app.listen(3000, function() {
  console.log('listening on port 3000!');
});
