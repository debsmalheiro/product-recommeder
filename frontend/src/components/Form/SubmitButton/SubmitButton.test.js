import { render, screen } from '@testing-library/react';
import SubmitButton from '.';

describe('SubmitButton component', () => {
  it('deve renderizar o botão com prop text', () => {
    render(<SubmitButton text="Enviar" />);

    const button = screen.getByRole('button', { name: /enviar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Enviar');
  });

  it('deve ter type submit', () => {
    render(<SubmitButton text="Enviar" />);

    const button = screen.getByRole('button', { name: /enviar/i });
    expect(button).toHaveAttribute('type', 'submit');
  });
});
