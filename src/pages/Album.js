import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      albumName: '',
      artistsName: '',
      albumData: [],
      favoritesMusics: [],
      successfulFetch: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchMusics();
    this.getFavorite();
  }

  getFavorite = async () => {
    const result = await getFavoriteSongs();
    const favorites = result.map((music) => music.trackId);
    // this.setState((prevState) => (
    //   { favoritesMusics: [...prevState.favoritesMusics, ...favorites] }
    // ));
    this.setState({
      favoritesMusics: favorites,
    });
  }

  addFavorite = async (track) => {
    this.setState({
      successfulFetch: false,
      loading: true,
    });
    await addSong(track);
    await this.getFavorite();
    this.setState({
      successfulFetch: true,
      loading: false,
    });
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const results = await getMusics(id);
    const { artworkUrl100, collectionName, artistName } = results[0];
    this.setState({
      successfulFetch: true,
    }, () => {
      this.setState({
        image: artworkUrl100,
        albumName: collectionName,
        artistsName: artistName,
        albumData: results,
      });
    });
  }

  render() {
    const { history } = this.props;
    const { albumData, image, albumName, artistsName,
      successfulFetch, loading, favoritesMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header history={ history } />
        {
          loading && <Loading />
        }
        {
          successfulFetch && (
            <section>
              <section>
                <img
                  src={ image }
                  alt={ albumName }
                />
                <h2 data-testid="album-name">{ albumName }</h2>
                <h3 data-testid="artist-name">{ artistsName }</h3>
              </section>
              {
                albumData.filter((element) => element.kind === 'song')
                  .map((track) => {
                    const isChecked = favoritesMusics.includes(track.trackId) === true;
                    return (
                      <MusicCard
                        key={ track.trackId }
                        trackName={ track.trackName }
                        previewUrl={ track.previewUrl }
                        trackId={ track.trackId }
                        musicData={ track }
                        addFavorite={ this.addFavorite }
                        checkedValue={ isChecked }
                      />
                    );
                  })
              }
            </section>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Album;
