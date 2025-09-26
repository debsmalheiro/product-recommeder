const baseURL = 'http://localhost:3001';

const getProducts = async () => {
  try {
    const response = await fetch(`${baseURL}/products`);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter os produtos:', error);
    throw error;
  }
};

export default getProducts;
