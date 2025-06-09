export class RolePermission {
  id?: number;
  role_id!: number;
  permission_id!: number;
  has_permission?: boolean; // <-- útil para UI
  start_at?: string; // backend lo maneja probablemente como string
  end_at?: string;
}
