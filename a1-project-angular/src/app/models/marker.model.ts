import { Product } from './product.model';

export class Marker {
  id: number;
  product: Product;
  userId: number;
  billId: number;
  position: google.maps.LatLngLiteral;
  area: Array<google.maps.LatLngLiteral>;
}
