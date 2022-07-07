import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logo from '../images/LOGO_POSITIVA 1.png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      disabled: true,
      loading: false,
    };
  }

  goToSearch = () => {
    const { history } = this.props;
    history.push('/search');
  }

  handleClickButton = async (event) => {
    const { inputName } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    await createUser({ name: inputName });
    this.goToSearch();
  }

  handleEnableButton = () => {
    const { inputName } = this.state;
    const minLengthName = 3;
    if (inputName.length >= minLengthName) {
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
      inputName: value,
    }, () => this.handleEnableButton());
  }

  render() {
    const { inputName, disabled, loading } = this.state;
    return (
      <div data-testid="page-login" className="loginPage">
        {
          loading ? <Loading /> : (
            <section>
              <section className="logoContainer">
                <img
                  className="logo"
                  src={ logo }
                  alt="Logo da trybetunes"
                />
              </section>
              <section className="formContainer">
                <form className="formContent">
                  <section className="inputTextContainer">
                    <input
                      className="inputText"
                      type="text"
                      data-testid="login-name-input"
                      name="inputName"
                      value={ inputName }
                      placeholder="Nome"
                      onChange={ this.handleChange }
                    />
                  </section>

                  <section className="inputButtonContainer">
                    <input
                      className="inputButton"
                      type="submit"
                      data-testid="login-submit-button"
                      value="Entrar"
                      disabled={ disabled }
                      onClick={ this.handleClickButton }
                    />
                  </section>
                </form>
              </section>
            </section>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
