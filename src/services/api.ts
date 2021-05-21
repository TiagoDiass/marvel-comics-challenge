import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MARVEL_API_URL,
  params: {
    apikey: process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY,
  },
});

export default api;
