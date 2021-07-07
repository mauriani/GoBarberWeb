import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { FiLock } from 'react-icons/fi';
import Input from '../../components/Input';

// mock para o nosso useField

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Inoput component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" icon={FiLock} />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" icon={FiLock} />,
    );
    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color:#ff9000');
      expect(containerElement).toHaveStyle('color:#ff9000');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color:#ff9000');
      expect(containerElement).not.toHaveStyle('color:#ff9000');
    });
  });

  it('should keep input border hightligth when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" icon={FiLock} />,
    );
    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com.br' },
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color:#ff9000');
    });
  });
});
