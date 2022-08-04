/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackName,
      previewUrl,
      trackId,
      fetchToFavorite,
      songObj,
      checked,
    } = this.props;
    return (
      <div className='song'>
        <h2>{trackName}</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <div>
          <span id="checkbox">
            <input
              type="checkbox"
              name="favoriteCheck"
              id="checkbox-element"
              checked={ checked }
              onChange={ () => fetchToFavorite(songObj) }
              data-testid={ `checkbox-music-${trackId}` }
            />
            <i id='heart' className="fa-solid fa-heart fa-lg" />
          </span>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  fetchToFavorite: PropTypes.func.isRequired,
  songObj: PropTypes.objectOf(PropTypes.string).isRequired,
  checked: PropTypes.bool.isRequired,
};
