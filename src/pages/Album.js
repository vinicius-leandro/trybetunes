import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      albumName: '',
      artistsName: '',
      albumData: [],
      successfulFetch: false,
    };
  }

  componentDidMount() {
    this.fetchMusics();
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
    const { albumData, image, albumName, artistsName, successfulFetch } = this.state;
    return (
      <div data-testid="page-album">
        <Header history={ history } />
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
                  .map((track) => (
                    <MusicCard
                      key={ track.trackId }
                      trackName={ track.trackName }
                      previewUrl={ track.previewUrl }
                    />
                  ))
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
