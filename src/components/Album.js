import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Album extends React.Component {
  render() {
    const { albumImage, collectionName, artistName, link } = this.props;
    return (
      <section>
        <Link
          to={ `/album/${link}` }
          data-testid={ `link-to-album-${link}` }
        >
          <img
            src={ albumImage }
            alt="Capa do album"
          />
          <p>
            { collectionName }
          </p>
          <p>
            { artistName }
          </p>
        </Link>
      </section>
    );
  }
}

Album.propTypes = {
  albumImage: PropTypes.string,
  collectionName: PropTypes.string,
  artistName: PropTypes.string,
  link: PropTypes.number,
}.isRequired;

export default Album;
