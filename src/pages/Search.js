import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      disabled: true,
    };
  }

  handleEnableButton = () => {
    const { artistName } = this.state;
    const minLengthName = 2;
    if (artistName.length >= minLengthName) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artistName: value,
    }, () => this.handleEnableButton());
  }

  render() {
    const { history } = this.props;
    const { artistName, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header history={ history } />
        <section>
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              name="artistName"
              placeholder="Nome do Artista/Album"
              value={ artistName }
              onChange={ this.handleChange }
            />

            <input
              type="submit"
              data-testid="search-artist-button"
              value="Pesquisar"
              disabled={ disabled }
            />
          </form>
        </section>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Search;
