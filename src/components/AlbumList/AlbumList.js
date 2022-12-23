import React from 'react';
import PropTypes from 'prop-types';
import Album from '../Album/Album';
import './AlbumList.css';

class AlbumList extends React.Component {
  render() {
    const { data, artist } = this.props;
    if (data.length === 0) {
      return (
        <section className="albumNotFoundContainer">
          <h1>Nenhum álbum foi encontrado</h1>
        </section>
      );
    }

    return (
      <section className="albumListContainer">
        <section className="albumListContent">
          <section>
            <h2 className="albumListArtist">{`Resultado de álbuns de: ${artist}`}</h2>
          </section>
          <section className="albumContainer">
            {
              data.map((album) => (
                <section
                  key={ album.collectionId }
                  className="album"
                >
                  <Album
                    link={ album.collectionId }
                    albumImage={ album.artworkUrl100 }
                    collectionName={ album.collectionName }
                    artistName={ album.artistName }
                  />
                </section>
              ))
            }
          </section>
        </section>
      </section>
    );
  }
}

AlbumList.propTypes = {
  artist: PropTypes.string,
  data: PropTypes.object,
}.isRequired;

export default AlbumList;
