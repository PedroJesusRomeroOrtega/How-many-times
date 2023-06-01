export interface ProductGroup {
  name: string;
  products: Product[];
}

export interface Product {
  name: string;
  purchaseDate?: Date;
  price?: number;
}
