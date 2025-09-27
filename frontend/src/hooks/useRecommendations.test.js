import { renderHook, act } from '@testing-library/react';
import useRecommendations from './useRecommendations';
import recommendationService from '../services/recommendation.service';

jest.mock('../services/recommendation.service', () => ({
  getRecommendations: jest.fn(),
}));

describe('useRecommendations hook', () => {
  const mockProducts = [
    { id: 1, name: 'Produto 1' },
    { id: 2, name: 'Produto 2' },
  ];

  const mockFormData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'SingleProduct'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com recommendations vazio', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts));
    expect(result.current.recommendations).toEqual([]);
  });

  it('deve chamar recommendationService e atualizar recommendations', () => {
    const mockReturn = [mockProducts[0]];

    recommendationService.getRecommendations.mockReturnValue(mockReturn);

    const { result } = renderHook(() => useRecommendations(mockProducts));

    let returnValue;

    act(() => {
      returnValue = result.current.getRecommendations(mockFormData);
    });

    expect(returnValue).toEqual(mockReturn);
    expect(result.current.recommendations).toEqual(mockReturn);
    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(mockFormData, mockProducts);
  });

  it('deve atualizar recommendations para array um vazio se service não retornar um array', () => {
    recommendationService.getRecommendations.mockReturnValue(null);

    const { result } = renderHook(() => useRecommendations(mockProducts));

    act(() => {
      result.current.getRecommendations(mockFormData);
    });

    expect(result.current.recommendations).toEqual([]);
  });
});
