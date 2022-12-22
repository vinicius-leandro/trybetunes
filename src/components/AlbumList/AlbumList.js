import React from 'react';
import PropTypes from 'prop-types';
import Album from '../Album';
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
        <section>
          <h2>{`Resultado de álbuns de: ${artist}`}</h2>
        </section>
        <section>
          {
            data.map((album) => (
              <Album
                key={ album.collectionId }
                link={ album.collectionId }
                albumImage={ album.artworkUrl100 }
                collectionName={ album.collectionName }
                artistName={ album.artistName }
              />
            ))
          }
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
