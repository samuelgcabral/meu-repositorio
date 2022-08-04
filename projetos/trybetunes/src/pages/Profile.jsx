import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Header from '../components/Header';

export default class Profile extends Component {
  state={
    loading: true,
    userInfo: {},
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({
      userInfo: { ...userInfo },
    }, () => {
      this.setState({
        loading: false,
      });
    });
    console.log(userInfo);
  }

  render() {
    const { loading, userInfo } = this.state;
    const { name, email, image, description } = userInfo;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {loading ? <Loading /> : (
            <>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <h3>{name}</h3>
              <h4>{email}</h4>
              <p>{description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </>
          )}
        </div>
      </>
    );
  }
}
