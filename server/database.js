const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const chalk = require('chalk')

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

const getAllFavorites = function(callback) {
  console.log(chalk.blue('doing a get request'));
  // get favorites from the database
  let queryStr = 'SELECT * FROM favmovies';
  connection.query(queryStr, callback);
};

const saveFavorite = function(favorite, callback) {
  console.log(chalk.green('doing a save request'));
  // save movie to favorites in the database
  let queryStr = 'INSERT INTO favmovies VALUES (?, ?, ?, ?, ?)';
  connection.query(queryStr, [favorite.id, favorite.title, favorite.release_date, favorite.vote_average, favorite.poster_path], callback);
};

const deleteFavorite = function(favorite, callback) {
  console.log(chalk.red.bgBlack('deleting a favorite'));
  // delete a movie from favorites in the database
  console.log(favorite.id);
  let queryStr = `DELETE FROM favmovies WHERE id = (?)`;
  connection.query(queryStr, [favorite.id], callback);
};

// CREATE TABLE favmovies (
//   id INTEGER NOT NULL PRIMARY KEY,
//   title VARCHAR(100),
//   release_date DATE,
//   vote_average DECIMAL, 
//   poster_path VARCHAR(200)
// );

// saveFavorite({id: 02, title: "Spirited Away", release_date: "2001-07-20", vote_average: 8.4, poster_path: "/dL11DBPcRhWWnJcFXl9A07MrqTI.jpg"}, function() {
//   console.log('saving into DB works');
// });

// deleteFavorite({id: 02}, function() {
//   console.log('deleting from DB works');
// });

getAllFavorites(function() {
  console.log('retrieving from DB works');
});

module.exports = { //added connection to the module exports
  connection,
  getAllFavorites,
  saveFavorite,
  deleteFavorite
};