import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RolePermissionService } from '../../services/role-permission-service';
import { ActivatedRoute } from '@angular/router';
import { Permission } from '../../models/permission';
import { RolePermission } from '../../models/role-permission';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role-service';
@Component({
  selector: 'app-role-permissions',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule],
  templateUrl: './role-permission.html',
  styleUrls: ['./role-permission.scss']
})
export class RolePermissions {
  private service = inject(RolePermissionService);
  private route = inject(ActivatedRoute);
  role = signal<Role | null>(null); // ✅ Usamos `signal` para estado reactivo
  private roleService= inject(RoleService)
  roleId = Number(this.route.snapshot.paramMap.get('roleId'));

  // Estado reactivo
  rolePermissions = signal<RolePermission[]>([]);
  permissions = signal<PermissionGroup[]>([]); // Debe llenarse con todos los permisos organizados por entidad

  displayedColumns = ['entity', 'GET', 'POST', 'PUT', 'DELETE'];

  ngOnInit() {
  this.loadRolePermissions();
}

loadRolePermissions() {
  // Cargar permisos asignados al rol
  this.service.getByRoleId(this.roleId).subscribe(rps => {
    this.rolePermissions.set(rps);
  });

  this.roleService.view(this.roleId).subscribe(role => {
  this.role.set(role);
});


  // ✅ Cargar permisos agrupados desde el backend
  this.service.getGroupedPermissionsByRoleId(this.roleId).subscribe(groups => {
    this.permissions.set(groups);
  });
}


  togglePermission(permission: Permission, checked: boolean) {
    if (checked) {
      this.service.create(this.roleId, permission.id!).subscribe(() => {
        this.loadRolePermissions();
      });
    } else {
      this.service.delete(this.roleId, permission.id!).subscribe(() => {
        this.loadRolePermissions();
      });
    }
  }

  isChecked(permissionId: number): boolean {
    return this.rolePermissions().some(rp => rp.permission_id === permissionId);
  }

  hasMethod(group: PermissionGroup, method: string): Permission | undefined {
    return group.permissions.find(p => p.method === method);
  }
}

interface PermissionGroup {
  entity: string;
  permissions: Permission[];
}
