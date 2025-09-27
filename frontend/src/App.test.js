import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./components/Form/Form', () => (props) => (
  <button onClick={() => props.updateRecommendations(['Produto 1', 'Produto 2'])}>
    Enviar
  </button>
));

jest.mock('./components/RecommendationList', () => ({ recommendations }) => (
  <div data-testid="recommendation-list">
    {recommendations.map((r, i) => (
      <span key={i}>{r}</span>
    ))}
  </div>
));

describe('App Component', () => {
  it('renderiza title e text de boas-vindas', () => {
    render(<App />);

    expect(screen.getByText('Recomendador de Produtos RD Station')).toBeInTheDocument();
    expect(
      screen.getByText(/Bem-vindo ao Recomendador de Produtos RD Station/i)
    ).toBeInTheDocument();
  });

  it('renderiza Form e RecommendationList', () => {
    render(<App />);

    expect(screen.getByText('Enviar')).toBeInTheDocument();
    expect(screen.getByTestId('recommendation-list')).toBeInTheDocument();
  });

  it('atualiza RecommendationList ao enviar Form', () => {
    render(<App />);

    const formButton = screen.getByText('Enviar');
    fireEvent.click(formButton);

    const list = screen.getByTestId('recommendation-list');
    expect(list).toHaveTextContent('Produto 1');
    expect(list).toHaveTextContent('Produto 2');
  });
});
