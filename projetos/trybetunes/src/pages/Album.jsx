/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    albumSongs: [],
    albumInformation: {},
    loading: false,
    favoriteSong: [],
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchMusic(id);
    this.getFromFavorite();
  }

  fetchMusic = async (id) => {
    this.setState({ loading: true });
    const albumResults = await getMusics(id);
    const { albumSongs } = this.state;
    albumResults.forEach((result, i) => ((i === 0)
      ? this.setAlbumInformation(result)
      : albumSongs.push(result)));
    this.setState({
      loading: false,
    });
  }

  fetchToFavorite = async (obj) => {
    const { favoriteSong } = this.state;
    this.setState({ loading: true });
    await addSong(obj);
    this.setState({
      loading: false,
      favoriteSong: [...favoriteSong, obj.trackId],
    });
  }

  getFromFavorite = async () => {
    const { favoriteSong } = this.state;
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSong: [...favoriteSong, ...result.map((song) => song.trackId)],
    });
  }

  setAlbumInformation = (info) => {
    this.setState({
      albumInformation: info,
    }, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { albumInformation, albumSongs, loading, favoriteSong } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          { loading ? <Loading />
            : (
              <>
                <h1 data-testid="artist-name">{albumInformation.artistName}</h1>
                <h3 data-testid="album-name">{albumInformation.collectionName}</h3>
                <div className='songs'>
                  {albumSongs.map((song) => (
                    <MusicCard
                      previewUrl={ song.previewUrl }
                      trackName={ song.trackName }
                      trackId={ song.trackId }
                      checked={ favoriteSong.some((favSong) => song.trackId === favSong) }
                      fetchToFavorite={ this.fetchToFavorite }
                      songObj={ song }
                      key={ song.trackNumber }
                    />))}
                </div>
              </>
            )}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
