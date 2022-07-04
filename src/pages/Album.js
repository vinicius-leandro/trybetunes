import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="page-album">
        <Header history={ history } />
      </div>
    );
  }
}

Album.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Album;
