export interface GetMarvelComicBooksDTO {
  title: string;
  authors: string[];
  characters: string[];
  publishDate: Date;
  description: string;
  pageCount: number;
  prices: number[];
  image: string;
}
