import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileCard extends React.Component {
  render() {
    const { image, name, email, description } = this.props;
    return (
      <section>
        <section>
          <img
            src={ image }
            alt={ `Foto de ${name}` }
            data-testid="profile-image"
          />
          <Link to="/profile/edit">
            <button
              type="button"
            >
              Editar perfil
            </button>
          </Link>
        </section>
        <section>
          <p>Nome</p>
          <span>{ name }</span>
        </section>
        <section>
          <p>E-mail</p>
          <span>{ email }</span>
        </section>
        <section>
          <p>Descrição</p>
          <span>{ description }</span>
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
