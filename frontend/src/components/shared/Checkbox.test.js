import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox component', () => {
  it('deve renderizar o checkbox e o children', () => {
    render(<Checkbox>Personalização de funis de vendas</Checkbox>);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    const children = screen.getByText('Personalização de funis de vendas');
    expect(children).toBeInTheDocument();
  });

  it('deve aceitar a prop checked', () => {
    render(<Checkbox defaultChecked={true}>Personalização de funis de vendas</Checkbox>);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('deve aceitar a prop onChange e disparar ao clicar', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange}>Personalização de funis de vendas</Checkbox>);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('deve aceitar outras props, como disabled', () => {
    render(<Checkbox disabled>Personalização de funis de vendas</Checkbox>);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});
