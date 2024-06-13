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

    // console.log(response.data);

    return { books: response.data.data.results, total: response.data.data.total };
  } catch (error) {
    return Promise.reject(error);
  }
};
