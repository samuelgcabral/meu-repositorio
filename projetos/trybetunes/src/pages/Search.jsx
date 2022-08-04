/* eslint-disable max-len */
/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    disabled: true,
    value: '',
    albums: [],
    loading: false,
    name: '',
  }

  handleChange = (e) => {
    const MIN_LENGTH = 1;
    const { value } = e.target;
    this.setState({
      value,
      name: value,
      disabled: (value.length <= MIN_LENGTH),
    });
  }

  searchArtist = async () => {
    this.setState({ loading: true });
    const { value } = this.state;
    const results = await searchAlbumsAPI(value);
    this.setState({
      albums: results,
      value: '',
      loading: false,
    });
  }

  render() {
    const { value, disabled, loading, albums, name } = this.state;
    return (
      <div className="searchDiv" data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <div className='inputBar'>
            <input
              type="text"
              data-testid="search-artist-input"
              name="search-artist"
              placeholder='Artists or albums'
              id="search-input"
              onChange={ this.handleChange }
              value={ value }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              id="searchButton"
              disabled={ disabled }
              onClick={ this.searchArtist }
            >
              Search
            </button>

          </div>)}
        {albums.length > 0 ? (
          <div>
            <h4>
              {`Album results for ${name}
                `}
            </h4>
            <div className='albums'>
              {albums.map((album) => (
                <div className="albumItem" key={ album.collectionId }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img id='albImg' src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <div>
                      <h2 className='albumTxt'>{album.collectionName}</h2>
                      <h3 className='albumTxt'>{album.artistName}</h3>
                      <i id='playButton' className="fa-solid fa-circle-play fa-2xl" />
                    </div>
                  </Link>
                </div>))}
            </div>
          </div>
        ) : (
          <p id='error'>
            No albums found, sorry
          </p>
        )}
      </div>
    );
  }
}
