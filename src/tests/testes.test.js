import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('tela de login', () => {
  it('existe a palavra "Login" na tela', () => {
    renderWithRouterAndRedux(<App />);
    const login = screen
      .getByText(/login/i);
    expect(login)
      .toBeInTheDocument();
  });

  describe('botões principais', () => {
    it('botão habilitado se campos forem preenchidos', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const inputEmail = screen
        .getByTestId('email-input');
      userEvent
        .type(inputEmail, 'jairmessias@bolsonaro.com');
      const inputPassword = screen
        .getByTestId('password-input');
      userEvent
        .type(inputPassword, '222022');
      const button = screen
        .getByRole(
          'button',
          { name: 'Entrar' },
        );
      userEvent
        .click(button);
      expect(history.location.pathname)
        .toBe('/carteira');
    });

    it('se adic despesa existe botão excluir', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/carteira');

      const adGastos = screen
        .getByRole('button');
      userEvent
        .click(adGastos);

      await waitFor(() => {
        const delGastos = screen
          .getByRole(
            'button',
            { name: 'Editar/Excluir' },
          );
        expect(delGastos)
          .toBeInTheDocument();
      });

      const delGastos = screen
        .getByRole(
          'button',
          { name: 'Editar/Excluir' },
        );
      userEvent
        .click(delGastos);

      await waitFor(() => {
        expect(delGastos)
          .not.toBeInTheDocument();
      });
    });
  });
});
