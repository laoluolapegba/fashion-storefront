export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  size: string;
  imageUrl: string | null;
  quantity: number;
}
