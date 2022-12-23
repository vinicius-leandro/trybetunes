import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading';
import { getUser, updateUser } from '../../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
      email: '',
      description: '',
      isDisable: true,
      loading: true,
      successfulFetch: false,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  goToProfile = () => {
    const { history } = this.props;
    history.push('/profile');
  }

  saveUser = async () => {
    const { image, name, email, description } = this.state;
    this.setState({ loading: true, successfulFetch: false });
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.goToProfile();
  }

  buttonValidation = () => {
    const { image, name, email, description } = this.state;
    if (image !== '' && name !== '' && description !== ''
    && email.includes('@') && email.includes('.com')) this.setState({ isDisable: false });
  }

  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({ [name]: value }, () => {
      this.buttonValidation();
    });
  }

  getProfile = async () => {
    const result = await getUser();
    const { image, name, email, description } = result;
    this.setState({
      image,
      name,
      email,
      description,
      loading: false,
      successfulFetch: true,
    }, () => this.buttonValidation());
  }

  render() {
    const { history } = this.props;
    const { image, name, email, description,
      isDisable, loading, successfulFetch } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header history={ history } />
        { loading && <Loading /> }
        {
          successfulFetch && (
            <section className="profileEditContainer">
              <section className="profileEditContent">

                <section className="imageAndInputContainer">
                  <div className="imageContent">
                    <img
                      src={ image }
                      alt={ `Foto de ${name}` }
                    />
                  </div>
                  <div className="inputImageContent">
                    <input
                      type="text"
                      data-testid="edit-input-image"
                      name="image"
                      value={ image }
                      placeholder="Insira um link"
                      onChange={ this.handleChange }
                    />
                  </div>
                </section>

                <section className="nameEditContainer">
                  <label
                    htmlFor="inputName"
                  >
                    <p>Nome</p>
                    <span>Fique à vontade para usar seu nome social</span>
                    <input
                      type="text"
                      data-testid="edit-input-name"
                      id="inputName"
                      name="name"
                      value={ name }
                      placeholder="Insira seu nome"
                      onChange={ this.handleChange }
                    />
                  </label>
                </section>

                <section className="emailEditContainer">
                  <label
                    htmlFor="inputEmail"
                  >
                    <p>E-mail</p>
                    <span>Escolha um e-mail que consulte diariamente</span>
                    <input
                      type="email"
                      data-testid="edit-input-email"
                      id="inputEmail"
                      name="email"
                      value={ email }
                      placeholder="Insira um e-mail"
                      onChange={ this.handleChange }
                    />
                  </label>
                </section>

                <section className="descriptionEditContainer">
                  <label
                    htmlFor="inputDescription"
                  >
                    <p>Descrição</p>
                    <textarea
                      data-testid="edit-input-description"
                      id="inputDescription"
                      name="description"
                      value={ description }
                      placeholder="Sobre mim"
                      onChange={ this.handleChange }
                    />
                  </label>
                </section>

                <section className="saveEditBtn">
                  <input
                    type="submit"
                    data-testid="edit-button-save"
                    value="Salvar"
                    disabled={ isDisable }
                    onClick={ this.saveUser }
                  />
                </section>

              </section>
            </section>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default ProfileEdit;
