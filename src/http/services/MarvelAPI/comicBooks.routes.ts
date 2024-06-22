import { IGetComicBooksFilters } from '#/modules/Book/repository/@types/IBooksRepository';
import { marvelAPI, marvelAPIToken } from './server';

export const getMarvelComicBooks = async (params: IGetComicBooksFilters) => {
  try {
    const { characters, creators, digitalId, page, size, startYear, title } = params;

    if (digitalId) {
      const response = await marvelAPI.get(`/comics/${digitalId}${marvelAPIToken}`);

      return { books: response.data.data.results, total: response.data.data.total };
    }

    const currentPage = page || 1;
    const limit = size || 1;

    const offset = currentPage <= 1 ? 0 : (currentPage - 1) * limit;

    if (startYear) {
      const response = await marvelAPI.get(`/comics${marvelAPIToken}`, {
        params: { limit, offset, startYear: Number(startYear) === 0 ? '0000' : startYear },
      });

      return { books: response.data.data.results, total: response.data.data.total };
    }

    const response = await marvelAPI.get(`/comics${marvelAPIToken}`, {
      params: { limit, offset, title },
    });

    return { books: response.data.data.results, total: response.data.data.total };
  } catch (error) {
    return Promise.reject(error);
  }
};
