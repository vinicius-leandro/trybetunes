import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId,
      handleFavorite, checkedValue, musicData } = this.props;
    return (
      <section>
        <section className="favorite">
          <div className="songName">
            <p>{ trackName }</p>
          </div>
          <div className="audio">
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
          </div>
          <div className="favoriteBtn">
            <label
              htmlFor="favorites"
            >
              Favoritar:
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                id="favorites"
                name="favorites"
                checked={ checkedValue }
                onChange={ () => handleFavorite(musicData, checkedValue) }

              />
            </label>
          </div>
        </section>
        <hr />
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  handleFavorite: PropTypes.func,
  checkedValue: PropTypes.bool,
  musicData: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default MusicCard;
