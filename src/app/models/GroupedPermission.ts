import { Permission } from "./permission";
export interface GroupedPermission {
  entity: string;
  permissions: Permission[];
}
