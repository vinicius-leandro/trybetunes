import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const results = await getUser();
    const { name } = results;
    this.setState({
      loading: false,
      userName: name,
    });
  }

  goToSearch = (objectHistory) => {
    const { history } = objectHistory;
    history.push('/search');
  }

  goToFavorites = (objectHistory) => {
    const { history } = objectHistory;
    history.push('/favorites');
  }

  goToProfile = (objectHistory) => {
    const { history } = objectHistory;
    history.push('/profile');
  }

  render() {
    const { userName, loading } = this.state;
    const history = this.props;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading /> : (
            <section className="headerContainer">
              <section>
                <p data-testid="header-user-name">{userName}</p>
              </section>

              <section>
                <button
                  type="button"
                  data-testid="link-to-search"
                  name="search"
                  onClick={ () => this.goToSearch(history) }
                >
                  Pesquisa
                </button>
                <button
                  type="button"
                  data-testid="link-to-favorites"
                  name="favorites"
                  onClick={ () => this.goToFavorites(history) }
                >
                  Favoritas
                </button>
                <button
                  type="button"
                  data-testid="link-to-profile"
                  name="profile"
                  onClick={ () => this.goToProfile(history) }
                >
                  Perfil
                </button>
              </section>

            </section>
          )
        }
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Header;
