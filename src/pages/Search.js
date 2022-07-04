import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="page-search">
        <Header history={ history } />
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Search;
