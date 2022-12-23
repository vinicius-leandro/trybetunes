import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileCard extends React.Component {
  render() {
    const { image, name, email, description } = this.props;
    return (
      <section className="profileContent">
        <section className="imageAndEditContainer">
          <div className="imageContent">
            <img
              src={ image }
              alt={ `Foto de ${name}` }
              data-testid="profile-image"
            />
          </div>
          <div className="editBtnContent">
            <Link to="/profile/edit">
              <button
                type="button"
              >
                Editar perfil
              </button>
            </Link>
          </div>
        </section>
        <section className="nameContainer">
          <p>Nome</p>
          <span>{ name }</span>
        </section>
        <section className="emailContainer">
          <p>E-mail</p>
          <span>{ email }</span>
        </section>
        <section className="descriptionContainer">
          <p>Descrição</p>
          <section>
            <span>{ description }</span>
          </section>
        </section>
      </section>
    );
  }
}

ProfileCard.propTypes = {
  image: PropType.string,
  name: PropType.string,
  email: PropType.string,
  description: PropType.string,
}.isRequired;

export default ProfileCard;
