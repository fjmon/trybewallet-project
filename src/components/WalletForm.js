import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { achaMoeda, recebeGastos } from '../redux/actions';
import api from '../moedaCorrente/api';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { mandaMoedas } = this.props;
    mandaMoedas();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]:
      value });
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { id } = this.state;
    const { recebeDespesas } = this.props;
    const dados = await api();
    this.setState({
      exchangeRates: dados,
    }, () => recebeDespesas(this.state));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  };

  render() {
    const { value,
      description,
      currency,
      method,
      tag } = this.state;
    const { moeda } = this.props;
    const { handleChange, handleClick } = this;
    return (
      <form>
        <label htmlFor="value">
          Custo:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            onChange={ handleChange }
            value={ value }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            onChange={ handleChange }
            value={ description }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            onChange={ handleChange }
            value={ currency }
          >
            { moeda.map((item) => (
              <option key={ item } value={ item }>
                {item}
              </option>)) }
          </select>
        </label>

        <label htmlFor="method">
          Forma de pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="method"
            onChange={ handleChange }
            value={ method }
          >
            <option value="Dinheiro">
              Dinheiro
            </option>
            <option value="Cartão de crédito">
              Cartão de crédito
            </option>
            <option value="Cartão de débito">
              Cartão de débito
            </option>
          </select>

          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            onChange={ handleChange }
            value={ tag }
          >
            <option value="Alimentação">
              Alimentação
            </option>
            <option value="Lazer">
              Lazer
            </option>
            <option value="Trabalho">
              Trabalho
            </option>
            <option value="Transporte">
              Transporte
            </option>
            <option value="Saúde">
              Saúde
            </option>

          </select>
        </label>
        <div>
          <button
            type="submit"
            name="SendCostButton"
            onClick={ handleClick }
          >
            Adicionar Despesa
          </button>
        </div>
      </form>

    );
  }
}

WalletForm.propTypes = {
  mandaMoedas: PropTypes.func
    .isRequired,
  moeda: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  recebeDespesas: PropTypes.func
    .isRequired,
};

const mapStateToProps = (state) => ({
  moeda: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  mandaMoedas: () => dispatch(achaMoeda()),
  recebeDespesas: (payload) => dispatch(
    recebeGastos(payload),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletForm);
