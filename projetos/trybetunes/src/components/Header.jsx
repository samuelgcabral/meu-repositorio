/* eslint-disable max-len */
/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    loading: true,
    name: '',
  }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = async () => {
    const { name } = await getUser();
    this.setState({
      loading: false,
      name,
    });
    return name;
  }

  render() {
    const { loading, name } = this.state;
    return (
      <div>
        {loading
          ? <Loading />
          : (
            <header className='headerComponent' data-testid="header-component">
              <div className='header'>
                <div className='header'>
                  <i className="fa-solid fa-headphones fa-2xl" />
                  <h1 id='headerTitle'>{`TrybeTunes de ${name}`}</h1>
                </div>
              </div>
              <div className='index'>
                <section className='searchSec'>
                  <i className="fa-solid fa-magnifying-glass fa-lg" />
                  <Link to="/search" data-testid="link-to-search" id='index'> Search </Link>
                </section>
                <section className='searchSec'>
                  <i className="fa-solid fa-heart" />
                  <Link to="/favorites" data-testid="link-to-favorites" id='index'>
                    Favorites
                  </Link>
                </section>
                <section className='searchSec'>
                  <i className="fa-solid fa-user" />
                  <Link to="/profile" data-testid="link-to-profile" id='index'>
                    Profile
                  </Link>
                </section>
              </div>
            </header>
          )}
      </div>
    );
  }
}
