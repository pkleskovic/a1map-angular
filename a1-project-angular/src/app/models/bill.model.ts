import { Product } from './product.model';

export class Bill {
  id: string;
  date: string;
  userId: number;
  products: Array<Product>;
  total: number;
}
