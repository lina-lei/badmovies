-- SET UP SCHEMA HERE
-- CREATE DATABASE badmovies;
USE badmovies;

DROP TABLE IF EXISTS favmovies;

CREATE TABLE favmovies (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR(100),
  release_date DATE,
  vote_average DECIMAL (8, 1), 
  poster_path VARCHAR(200)
);





