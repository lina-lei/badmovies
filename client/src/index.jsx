import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  getMovies(genreId) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('/search', {params:{genreId: genreId}})
    .then((result) => {
      console.log('result is', result);
      this.setState({movies: result.data});
    })
    .catch((err) => console.log('error getting movies', err));
  }

  saveMovie(movie) {
    // same as above but do something diff
    // console.log('movie', movie);
    axios.post('/save', {
      id: movie.id, 
      title: movie.title,   
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path
    })
    .then((data) => {
      // console.log('what i get back', data);
      this.setState({
        favorites: data.data
      });
    })
    .catch((err) => console.log('client: error saving movie', err));
  }

  deleteMovie(movie) {
    // same as above but do something diff
    axios.post('/delete', {
      id: movie.id, 
      title: movie.title,   
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path
    })
    .then((data) => {
      this.setState({
        favorites: data.data
      });
    })
    .catch((err) => console.log('client: error deleting movie', err));
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} saveMovie={this.saveMovie} deleteMovie={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));