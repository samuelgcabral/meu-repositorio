import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state={
    loading: true,
    disabled: true,
    userInfo: {
      name: '',
      email: '',
      description: '',
      image: '',
    },
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({
      userInfo: { ...userInfo },
      loading: false,
    }, this.verifyConditions);
  }

  handleChange = ({ target }) => {
    const { name: userName, value } = target;
    const { userInfo } = this.state;
    this.setState({
      userInfo: { ...userInfo, [userName]: value },
    }, this.verifyConditions);
  }

    verifyConditions = () => {
      const { userInfo } = this.state;
      const { email, description, image, name } = userInfo;
      const regexEmail = /\S+@\S+\.\S+/;
      const infoArray = [email, description, image, name];
      const verifyLength = infoArray.every((item) => item.length > 0);

      if (verifyLength && email.match(regexEmail)) {
        this.setState({ disabled: false });
      }
      this.setState({ loading: false });
    }

  saveInfo = async () => {
    this.setState({ loading: true });
    const { userInfo } = this.state;
    const { history } = this.props;
    const { email, description, image, name } = userInfo;
    const objToSave = {
      email,
      description,
      image,
      name,
    };
    console.log('aaaaa');
    await updateUser(objToSave);
    history.push('/profile');
  }

  render() {
    const { loading,
      disabled,
      userInfo: { name, email, image, description },
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          { loading ? <Loading /> : (
            <form>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  data-testid="edit-input-name"
                  name="name"
                  id="name"
                  value={ name }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="text"
                  data-testid="edit-input-email"
                  name="email"
                  id="email"
                  value={ email }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <input
                  type="text"
                  data-testid="edit-input-description"
                  name="description"
                  id="description"
                  value={ description }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <label htmlFor="image">
                Imagem:
                <input
                  type="text"
                  data-testid="edit-input-image"
                  name="image"
                  id="image"
                  value={ image }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ disabled }
                onClick={ this.saveInfo }
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};
