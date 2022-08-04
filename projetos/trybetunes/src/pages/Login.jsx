/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import HeaderLogin from '../components/HeaderLogin';

export default class Login extends Component {
  state = {
    disabled: true,
    name: '',
    loading: false,
  }

  submitClicked = async () => {
    this.setState({ loading: true });
    const { name } = this.state;
    const { history } = this.props;
    await createUser({ name });
    history.push('./search');
  }

  handleChange = (e) => {
    const MIN_LENGTH = 2;
    const { value } = e.target;
    this.setState({
      name: value,
      disabled: (value.length <= MIN_LENGTH),
    });
  }

  render() {
    const { name, disabled, loading } = this.state;
    return (
      <>
        <HeaderLogin />
        <div className="pageLogin" data-testid="page-login">
          { loading
            ? <Loading />
            : (
              <>
                <h1 id='titleLogin'>Log in to continue</h1>
                <div className='loginDiv'>
                  <input
                    type="text"
                    data-testid="login-name-input"
                    id="name-input"
                    name="name-input"
                    placeholder='Type your name'
                    value={ name }
                    onChange={ this.handleChange }
                  />
                  <button
                    type="button"
                    disabled={ disabled }
                    id="loginButton"
                    data-testid="login-submit-button"
                    onClick={ this.submitClicked }
                  >
                    Login
                  </button>
                </div>
              </>
            )}
        </div>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};
