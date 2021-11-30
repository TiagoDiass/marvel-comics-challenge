import api from 'services/api';

type GetAllComicsParams = {
  limit?: number;
  offset?: number;
  titleStartsWith?: string;
};

/**
 * @service Serviço de quadrinhos (contém as requisições da API de quadrinhos)
 */
const comicsService = {
  /**
   * @request Requisição para obter todos quadrinhos
   */
  getAll: (params?: GetAllComicsParams) => {
    return api.get('/v1/public/comics', { params });
  },
};

export default comicsService;
