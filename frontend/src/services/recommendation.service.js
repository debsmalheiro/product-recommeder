import { normalizeData } from "../utils/normalizeData";

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' },
  products
) => {
  const selectedPreferences = normalizeData(formData.selectedPreferences);
  const selectedFeatures = normalizeData(formData.selectedFeatures);

  const compatibleProducts = products.map(product => {
    const productPreferencesSet = new Set(normalizeData(product.preferences));
    const productFeaturesSet = new Set(normalizeData(product.features));

    const matchPreferences = selectedPreferences.filter(pref => productPreferencesSet.has(pref)).length;
    const matchFeatures = selectedFeatures.filter(feat => productFeaturesSet.has(feat)).length;

    const compatibilityLevel = matchPreferences + matchFeatures;

    return { ...product, compatibilityLevel };
  })

  const recommendedProducts = compatibleProducts.filter(p => p.compatibilityLevel > 0);

  if (formData.selectedRecommendationType === 'SingleProduct') {
    const lastProduct = recommendedProducts.reduce((acc, product) => {
      if (!acc || product.compatibilityLevel >= acc.compatibilityLevel) {
        return product;
      }

      return acc;
    }, null)

    console.log("Produto unico:", lastProduct);
    return lastProduct ? [lastProduct] : [];
  }

  console.log("Multiplos produtos:", recommendedProducts);

  return recommendedProducts;
};

export default { getRecommendations };
