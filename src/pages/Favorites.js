import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header history={ history } />
      </div>
    );
  }
}

Favorites.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Favorites;
