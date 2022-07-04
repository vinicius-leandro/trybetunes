import React from 'react';
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

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading /> : <p data-testid="header-user-name">{userName}</p>
        }
      </header>
    );
  }
}

export default Header;
