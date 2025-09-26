import { render, screen, fireEvent } from '@testing-library/react';
import Preferences from './Preferences';

describe('Preferences component', () => {
  const mockPreferences = ['Email', 'Chat', 'Notificações'];
  const preferencesChangeMock = jest.fn();

  it('deve renderizar o title do component', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={preferencesChangeMock}
      />
    );

    const title = screen.getByText('Preferências:');
    expect(title).toBeInTheDocument();
  });

  it('deve renderizar todas as preferências passadas', () => {
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={preferencesChangeMock}
      />
    );

    mockPreferences.forEach((preference) => {
      const checkbox = screen.getByLabelText(preference);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });
  });

  it('deve marcar as preferências que vierem em selectedPreferences', () => {
    const selected = ['Chat'];
    render(
      <Preferences
        preferences={mockPreferences}
        selectedPreferences={selected}
        onPreferenceChange={preferencesChangeMock}
      />
    );

    const checkedBox = screen.getByLabelText('Chat');
    expect(checkedBox).toBeChecked();
  });

  it('deve chamar onPreferenceChange ao marcar ou desmarcar uma preferência', () => {
    const handleChange = jest.fn();
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={handleChange}
      />
    );

    const emailCheckbox = screen.getByLabelText('Email');

    fireEvent.click(emailCheckbox);
    expect(handleChange).toHaveBeenCalledWith(['Email']);

    fireEvent.click(emailCheckbox);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('deve manter múltiplas preferências selecionadas corretamente', () => {
    const handleChange = jest.fn();
    render(
      <Preferences
        preferences={mockPreferences}
        onPreferenceChange={handleChange}
      />
    );

    const emailCheckbox = screen.getByLabelText('Email');
    const chatCheckbox = screen.getByLabelText('Chat');

    fireEvent.click(emailCheckbox);
    expect(handleChange).toHaveBeenCalledWith(['Email']);

    fireEvent.click(chatCheckbox);
    expect(handleChange).toHaveBeenCalledWith(['Email', 'Chat']);

    fireEvent.click(emailCheckbox);
    expect(handleChange).toHaveBeenCalledWith(['Chat']);
  });
});
