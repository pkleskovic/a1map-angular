import { Product } from './product.model';

export class Bill {
  id: number;
  date: string;
  userId: number;
  products: Array<Product>;
  total: number;
}
