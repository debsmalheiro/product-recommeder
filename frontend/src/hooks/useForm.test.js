import { renderHook, act } from '@testing-library/react';
import useForm from './useForm';

describe('useForm hook', () => {
  const initialState = { name: '', email: '' };

  it('deve inicializar com o state inicial', () => {
    const { result } = renderHook(() => useForm(initialState));
    expect(result.current.formData).toEqual(initialState);
  });

  it('deve atualizar o state corretamente ao chamar handleChange', () => {
    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('name', 'Moana');
    });

    expect(result.current.formData).toEqual({ name: 'Moana', email: '' });

    act(() => {
      result.current.handleChange('email', 'moana@gmail.com');
    });

    expect(result.current.formData).toEqual({ name: 'Moana', email: 'moana@gmail.com' });
  });
});
