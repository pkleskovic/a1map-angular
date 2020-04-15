import { Bill } from './bill.model';
import { Marker } from './marker.model';

export class User {
  id: number;
  name: string;
  surname: string;
  email: string;
  profileImgUrl: string;
  markers: Array<Marker>;
  bills: Array<Bill>;
}
