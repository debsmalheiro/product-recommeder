import { render, screen } from '@testing-library/react';
import RecommendationList from './index';

describe('RecommendationList component', () => {
  it('deve renderizar o title do componente', () => {
    render(<RecommendationList recommendations={[]} />);

    const title = screen.getByText('Lista de Recomendações:');
    expect(title).toBeInTheDocument();
  });

  it('deve exibir texto quando não existir recomendações', () => {
    render(<RecommendationList recommendations={[]} />);

    const message = screen.getByText('Nenhuma recomendação encontrada.');
    expect(message).toBeInTheDocument();
  });

  it('deve renderizar a lista de recomendações', () => {
    const mockRecommendations = [
      { name: 'Produto A' },
      { name: 'Produto B' },
    ];

    render(<RecommendationList recommendations={mockRecommendations} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Produto A');
    expect(items[1]).toHaveTextContent('Produto B');
  });

  it('não deve exibir mensagem de "nenhuma recomendação" quando existirem recomendações', () => {
    const mockRecommendations = [{ name: 'Produto A' }];

    render(<RecommendationList recommendations={mockRecommendations} />);

    const message = screen.queryByText('Nenhuma recomendação encontrada.');
    expect(message).not.toBeInTheDocument();
  });
});
