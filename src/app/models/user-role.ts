import { User } from './user';

export class UserRole {
  id?: string;
  user_id!: number;
  role_id!: number;
  startAt?: string;
  endAt?: string;
  user?: User; // Esta propiedad la puedes asignar al recibir los datos
}
