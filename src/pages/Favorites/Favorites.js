import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import './Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesMusics: [],
      loading: true,
      successfulFetch: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = async () => {
    const result = await getFavoriteSongs();
    this.setState({
      loading: false,
      successfulFetch: true,
      favoritesMusics: result,
    });
  }

  handleFavorites = async (track) => {
    this.setState({
      successfulFetch: false,
      loading: true,
    });
    await removeSong(track);
    await this.getFavorite();
    this.setState({
      successfulFetch: true,
      loading: false,
    });
  }

  render() {
    const { favoritesMusics, loading, successfulFetch } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header history={ history } />
        { loading && <Loading />}
        {
          successfulFetch && (
            <section className="favoritesContainer">
              <div className="favoritesContent">
                <h2>Músicas favoritas:</h2>
                <hr />
                {
                  favoritesMusics.map((track) => (
                    <MusicCard
                      key={ track.trackId }
                      trackName={ track.trackName }
                      previewUrl={ track.previewUrl }
                      trackId={ track.trackId }
                      musicData={ track }
                      handleFavorite={ this.handleFavorites }
                      checkedValue
                    />
                  ))
                }
              </div>
            </section>
          )
        }
      </div>
    );
  }
}

Favorites.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Favorites;
