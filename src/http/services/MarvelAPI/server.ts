import axios from 'axios';

const marvelAPI = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public',
});

export const marvelAPIToken = '?ts=1&apikey=9564333bfd7f3e9280ae285c0243574b&hash=0c85a6d8527d40f6eec3bfb8beb49be4';

export { marvelAPI };
