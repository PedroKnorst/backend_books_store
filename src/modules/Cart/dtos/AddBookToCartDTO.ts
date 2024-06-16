export interface AddBookToCartDTO {
  id: string;
  clientId: string;
  bookId: string;
  totalPrice: number;
  cartTotalPrice: number;
  quantity: number;
}
