import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteT } from '../redux/actions';

class Table extends Component {
  delBot = (id) => {
    const { despesa, delDispatch } = this.props;
    const novaDespesa = despesa
      .filter((item) => id !== item.id);
    delDispatch(novaDespesa);
  };

  render() {
    const { despesa } = this.props;
    const head = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <table>
        <thead>
          <tr>
            {head
              .map((valor) => <th key={ valor }>{valor}</th>)}
          </tr>
        </thead>

        <tbody>
          {despesa.map((valor) => (
            <tr key={ valor.id }>
              <td>{valor.description}</td>
              <td>{valor.tag}</td>
              <td>{valor.method}</td>
              <td>
                {Number(valor.value)
                  .toFixed(2)}

              </td>
              <td>
                {valor.exchangeRates[valor.currency]
                  .name}

              </td>
              <td>
                {Number(valor.exchangeRates[valor.currency]
                  .ask).toFixed(2)}

              </td>
              <td>
                {Number(valor.exchangeRates[valor.currency]
                  .ask * valor.value)
                  .toFixed(2)}
              </td>
              <td>Real</td>

              <td>
                <button
                  type="submit"
                  data-testid="delete-btn"
                  id={ valor.id }
                  key={ valor.id }
                  onClick={ () => this
                    .delBot(valor.id) }
                >
                  Editar/Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  despesa: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  delDispatch: (payload) => dispatch(
    deleteT(payload),
  ),
});

Table.propTypes = {
  despesa: PropTypes.arrayOf.isRequired,
  delDispatch: PropTypes.func.isRequired,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
