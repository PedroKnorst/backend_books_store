import { marvelAPI, marvelAPIToken } from './server';

export interface getMarvelComicBooksFilters {
  page: number;
  size: number;
}

export const getMarvelComicBooks = async (params: getMarvelComicBooksFilters) => {
  try {
    const response = await marvelAPI.get(`/comics${marvelAPIToken}`, {
      params: { limit: params.size, offset: params.page <= 1 ? 0 : (params.page - 1) * params.size },
    });

    return { books: response.data.results, total: response.data.total };
  } catch (error) {
    return Promise.reject(error);
  }
};
