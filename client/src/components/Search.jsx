import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      genreId: ''
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }
 
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
    .then((result) => {
      this.setState({
        genres: result.data
      });
    })
    .catch((err) => console.log('error displaying genre results', err));
  }

  handleSelect(event) {
    this.setState({
      genreId: event.target.value
    });
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select onChange={(e) => this.handleSelect(e)}>
          {this.state.genres.map((genre) => (<option value={genre.id}>{genre.name}</option>))}
        </select>
        <br/><br/>

        <button onClick={() => this.props.getMovies(this.state.genreId)}>Search</button>

      </div>
    );
  }
}

export default Search;