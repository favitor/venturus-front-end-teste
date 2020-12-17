import axios from 'axios';

/**
 * I let my x-rapidapi-key so you don't have create an account.
 * Not is the best way
 */

const api = axios.create({
  baseURL: 'https://v3.football.api-sports.io/',
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': '05dc654aaaf29dd835b5ede3139641d3',
  },
});

export default api;
