import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { usuario, despesas } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          {usuario}
        </p>
        <p data-testid="total-field">
          {despesas.reduce((acc, curr) => (
            acc + curr.value * curr
              .exchangeRates[curr.currency]
              .ask
          ), 0).toFixed(2)}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}

Header.propTypes = ({
  usuario: PropTypes.string
    .isRequired,
  despesas: PropTypes.arrayOf
    .isRequired,
});

const mapStateToProps = (state) => ({
  usuario: state.user.email,
  despesas: state.wallet.expenses,
});

export default connect(
  mapStateToProps,
)(Header);
