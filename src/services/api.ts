import axios from 'axios';

/**
 * @service instância do axios configurada com BASE_URL e params padrão entre todas requests
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MARVEL_API_URL,
  params: {
    apikey: process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY,
  },
});

export default api;
