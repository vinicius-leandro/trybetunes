import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId,
      addFavorite, checkedValue, musicData } = this.props;
    return (
      <section>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label
          htmlFor="favorites"
        >
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id="favorites"
            name="favorites"
            checked={ checkedValue }
            onChange={ () => addFavorite(musicData, checkedValue) }

          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  addFavorite: PropTypes.func,
  checkedValue: PropTypes.bool,
  musicData: PropTypes.object,
}.isRequired;

export default MusicCard;
