const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

const getAllFavorites = function(callback) {
  // get favorites from the database
  let queryStr = 'SELECT * FROM favmovies';
  connection.query(queryStr, function(err, data) {
    if (err) console.log('error retrieving from DB', err);
    else callback(data);
  });
};

const saveFavorite = function(favorite, callback) {
  // save movie to favorites in the database
  // let queryStr = 'INSERT INTO favmovies VALUES (01, "Spirited Away", "2001-07-20", 8.4, "/dL11DBPcRhWWnJcFXl9A07MrqTI.jpg")';
  let queryStr = 'INSERT INTO favmovies VALUES (?, ?, ?, ?, ?)';
  connection.query(queryStr, [favorite.id, favorite.title, favorite.release_date, favorite.vote_average, favorite.poster_path], function(err, data) {
    if (err) console.log('error saving into DB', err);
    else callback(data);
  });
};

const deleteFavorite = function(callback) {
  // delete a movie from favorites in the database
};

// CREATE TABLE favmovies (
//   id INTEGER NOT NULL PRIMARY KEY,
//   title VARCHAR(100),
//   release_date DATE,
//   vote_average DECIMAL, 
//   poster_path VARCHAR(200)
// );

saveFavorite({id: 02, title: "Spirited Away", release_date: "2001-07-20", vote_average: 8.4, poster_path: "/dL11DBPcRhWWnJcFXl9A07MrqTI.jpg"}, function() {
  console.log('saving into DB works');
});

getAllFavorites(function() {
  console.log('retrieving from DB works');
});

module.exports = { //added connection to the module exports
  connection,
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};