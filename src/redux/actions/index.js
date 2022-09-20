import api from '../../moedaCorrente/api';

export const SET_EMAIL = 'SET_EMAIL';
export const BUSCA_MOEDA = 'BUSCA_MOEDA';
export const RECEBE_GASTOS = 'RECEBE_GASTOS';
export const DELETAR = 'DELETAR';

export const addEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});

export const buscaMoeda = (payload) => ({
  type: BUSCA_MOEDA,
  payload,
});

export const recebeGastos = (payload) => ({
  type: RECEBE_GASTOS,
  payload,
});

export const deleteT = (payload) => ({
  type: DELETAR,
  payload,
});

export const achaMoeda = () => async (
  dispatch,
) => {
  const dadoBan = await api();
  dispatch(buscaMoeda(Object
    .keys(dadoBan)));
};
