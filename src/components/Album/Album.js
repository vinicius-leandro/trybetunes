import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Album.css';

class Album extends React.Component {
  render() {
    const { albumImage, collectionName, artistName, link } = this.props;
    return (
      <Link
        to={ `/album/${link}` }
        data-testid={ `link-to-album-${link}` }
      >
        <div className="albumContent">
          <img
            src={ albumImage }
            alt="Capa do album"
          />
          <p>
            { collectionName }
          </p>
          <p className="teste">
            { artistName }
          </p>
        </div>
      </Link>
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
