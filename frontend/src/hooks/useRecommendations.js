import { useState } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = (formData) => {
    const recommend = recommendationService.getRecommendations(formData, products);
    setRecommendations(Array.isArray(recommend) ? recommend : []);
    return recommend;
  };

  return { recommendations, getRecommendations, setRecommendations };
}

export default useRecommendations;
