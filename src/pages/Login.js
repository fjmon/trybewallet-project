import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      button: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validar());
  };

  validar = () => {
    const MIN_CARAC = 6;
    const { email,
      senha } = this.state;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaVal = senha.length >= MIN_CARAC;

    return regex.test(email) && senhaVal
      ? this.setState({ button: false })
      : this.setState({ button: true });
  };

  cliqueBot = () => {
    const { login,
      history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('/carteira');
  };

  render() {
    const { email,
      senha,
      button } = this.state;
    const { handleChange,
      cliqueBot } = this;
    return (
      <form
        action=""
        onSubmit={
          (e) => e.preventDefault()
        }
      >
        <div>Login</div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              data-testid="email-input"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={ email }
              onChange={ handleChange }
            />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              name="senha"
              id="senha"
              placeholder="Senha"
              value={ senha }
              required
              min={ 6 }
              onChange={ this.handleChange }
            />
          </label>
        </div>

        <div>
          <button
            type="submit"
            name="button"
            disabled={ button }
            onClick={ cliqueBot }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func
    .isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(
    addEmail(payload),
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
