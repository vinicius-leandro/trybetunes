import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header history={ history } />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default ProfileEdit;
