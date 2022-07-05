import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import ProfileCard from '../components/ProfileCard';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      loading: true,
      successfulFetch: false,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    const result = await getUser();
    this.setState({ profile: result, loading: false, successfulFetch: true });
  }

  render() {
    const { history } = this.props;
    const {
      profile: { image, name, email, description },
      loading,
      successfulFetch } = this.state;
    return (
      <div data-testid="page-profile">
        <Header history={ history } />
        { loading && <Loading /> }
        <section>
          {
            successfulFetch && (
              <ProfileCard
                image={ image }
                name={ name }
                email={ email }
                description={ description }
              />
            )
          }
        </section>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Profile;
