import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../../services/userAPI';
import logo from '../../images/LOGO_HEADER.png';
import userImageDefault from '../../images/DEFAULT_USER_IMAGE.png';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userImage: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const results = await getUser();
    const { name, image } = results;
    this.setState({
      loading: false,
      userName: name,
      userImage: image,
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
    const { userName, userImage, loading } = this.state;
    const history = this.props;
    const ToggleuserImage = userImage === '' ? userImageDefault : userImage;
    return (
      <header data-testid="header-component" className="headerContainer">
        {
          loading ? <Loading /> : (
            <section className="headerContainer">
              <section className="topHeader">
                <section className="imgContainer">
                  <Link to="/">
                    <img
                      src={ logo }
                      alt="Logo da trybetunes"
                    />
                  </Link>
                </section>
                <section className="userContainer">
                  <div className="userContent">
                    <img
                      src={ ToggleuserImage }
                      alt="Foto do usuário"
                    />
                    <p data-testid="header-user-name">{userName}</p>
                  </div>
                </section>
              </section>

              <section className="bottomHeader">
                <button
                  type="button"
                  data-testid="link-to-search"
                  id="searchButton"
                  name="search"
                  onClick={ () => this.goToSearch(history) }
                >
                  Pesquisa
                </button>
                <button
                  type="button"
                  data-testid="link-to-favorites"
                  id="favoritesButton"
                  name="favorites"
                  onClick={ () => this.goToFavorites(history) }
                >
                  Favoritas
                </button>
                <button
                  type="button"
                  data-testid="link-to-profile"
                  id="profileButton"
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
