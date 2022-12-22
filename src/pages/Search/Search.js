import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import AlbumList from '../../components/AlbumList';
import Loading from '../../components/Loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      artistData: [],
      artistSearched: '',
      disabled: true,
      loading: false,
      successfulFetch: false,
    };
  }

  handleClickButton = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    this.setState({ artistName: '', loading: true });
    const results = await searchAlbumsAPI(artistName);
    this.setState({
      successfulFetch: true,
      artistSearched: artistName,
      loading: false,
      artistData: results,
    });
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
    const { artistName, disabled, loading,
      successfulFetch, artistData, artistSearched } = this.state;
    return (
      <div data-testid="page-search">
        <Header history={ history } />
        <section className="searchFormContainer">
          <form>
            <input
              className="searchTextInput"
              type="text"
              data-testid="search-artist-input"
              name="artistName"
              placeholder="Nome do Artista/Album"
              value={ artistName }
              onChange={ this.handleChange }
            />

            <input
              className="searchButtonInput"
              type="submit"
              data-testid="search-artist-button"
              value="Pesquisar"
              disabled={ disabled }
              onClick={ this.handleClickButton }
            />
          </form>
        </section>
        {loading && <Loading />}
        {
          successfulFetch && (
            <AlbumList data={ artistData } artist={ artistSearched } />
          )
        }
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Search;
