// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { BUSCA_MOEDA,
  RECEBE_GASTOS,
  DELETAR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletRed(
  state = INITIAL_STATE,
  action,
) {
  switch (action.type) {
  case BUSCA_MOEDA:
    return {
      ...state,
      currencies: action
        .payload,
    };
  case RECEBE_GASTOS:
    return {
      ...state,
      expenses: [...state
        .expenses,
      { ...action
        .payload }],
    };
  case DELETAR:
    return {
      ...state,
      expenses: action
        .payload,
    };
  default:
    return state;
  }
}
export default walletRed;
