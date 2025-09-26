import getProducts from "./product.service";

const baseURL = 'http://localhost:3001';
global.fetch = jest.fn();

describe('Product Service', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar os produtos quando a requisição der certo', async () => {
    const mockData = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await getProducts();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(`${baseURL}/products`);
  })

  it('deve lançar um erro quando a requisição falhar', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });

    await expect(getProducts()).rejects.toThrow('500 Internal Server Error');
    expect(fetch).toHaveBeenCalledWith(`${baseURL}/products`);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao obter os produtos:', expect.any(Error));
  })
});
