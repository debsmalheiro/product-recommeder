import { render, screen, fireEvent } from '@testing-library/react';
import RecommendationType from './RecommendationType';

describe('RecommendationType component', () => {
  it('deve renderizar o title do component', () => {
    render(<RecommendationType onRecommendationTypeChange={() => { }} />);

    const title = screen.getByText('Tipo de Recomendação:');
    expect(title).toBeInTheDocument();
  });

  it('deve renderizar os dois radios btn', () => {
    render(<RecommendationType onRecommendationTypeChange={() => { }} />);

    const singleProductRadio = screen.getByRole('radio', { name: /produto único/i });
    const multipleProductsRadio = screen.getByRole('radio', { name: /múltiplos produtos/i });

    expect(singleProductRadio).toBeInTheDocument();
    expect(multipleProductsRadio).toBeInTheDocument();
  });

  it('deve chamar onRecommendationTypeChange com "SingleProduct" ao clicar no radio', () => {
    const handleChange = jest.fn();
    render(<RecommendationType onRecommendationTypeChange={handleChange} />);

    const singleProductRadio = screen.getByRole('radio', { name: /produto único/i });
    fireEvent.click(singleProductRadio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('SingleProduct');
  });

  it('deve chamar onRecommendationTypeChange com "MultipleProducts" ao clicar no radio', () => {
    const handleChange = jest.fn();
    render(<RecommendationType onRecommendationTypeChange={handleChange} />);

    const multipleProductsRadio = screen.getByRole('radio', { name: /múltiplos produtos/i });
    fireEvent.click(multipleProductsRadio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('MultipleProducts');
  });
});
