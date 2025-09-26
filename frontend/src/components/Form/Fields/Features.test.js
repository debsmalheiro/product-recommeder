import { render, screen, fireEvent } from '@testing-library/react';
import Features from './Features';

describe('Features component', () => {
  const mockFeatures = ['Chat', 'Automação', 'Relatórios'];
  const featureChangeMock = jest.fn();

  it('deve renderizar o title do component', () => {
    render(<Features features={mockFeatures} onFeatureChange={featureChangeMock} />);

    const title = screen.getByText('Funcionalidades:');
    expect(title).toBeInTheDocument();
  });

  it('deve renderizar todas as features passadas', () => {
    render(<Features features={mockFeatures} onFeatureChange={featureChangeMock} />);

    mockFeatures.forEach((feature) => {
      const checkbox = screen.getByLabelText(feature);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });
  });

  it('deve marcar as features que vierem em selectedFeatures', () => {
    const selected = ['Automação'];
    render(
      <Features
        features={mockFeatures}
        selectedFeatures={selected}
        onFeatureChange={featureChangeMock}
      />
    );

    const checkedBox = screen.getByLabelText('Automação');
    expect(checkedBox).toBeChecked();
  });

  it('deve chamar onFeatureChange ao marcar ou desmarcar uma feature', () => {
    const handleChange = jest.fn();
    render(<Features features={mockFeatures} onFeatureChange={handleChange} />);

    const chatCheckbox = screen.getByLabelText('Chat');

    fireEvent.click(chatCheckbox);
    expect(handleChange).toHaveBeenCalledWith(['Chat']);

    fireEvent.click(chatCheckbox);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('deve manter múltiplas features selecionadas corretamente', () => {
    const handleChange = jest.fn();
    render(<Features features={mockFeatures} onFeatureChange={handleChange} />);

    const chatCheckbox = screen.getByLabelText('Chat');
    const automacaoCheckbox = screen.getByLabelText('Automação');

    fireEvent.click(chatCheckbox);
    expect(handleChange).toHaveBeenCalledWith(['Chat']);

    fireEvent.click(automacaoCheckbox);
    expect(handleChange).toHaveBeenCalledWith(['Chat', 'Automação']);

    fireEvent.click(chatCheckbox);
    expect(handleChange).toHaveBeenCalledWith(['Automação']);
  });
});
