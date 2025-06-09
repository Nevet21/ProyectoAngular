import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RolePermissionService } from '../../services/role-permission-service';
import { ActivatedRoute } from '@angular/router';
import { Permission } from '../../models/permission';
import { RolePermission } from '../../models/role-permission';

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

  roleId = Number(this.route.snapshot.paramMap.get('roleId'));

  // Estado reactivo
  rolePermissions = signal<RolePermission[]>([]);
  permissions = signal<PermissionGroup[]>([]); // Debe llenarse con todos los permisos organizados por entidad

  displayedColumns = ['entity', 'GET', 'POST', 'PUT', 'DELETE'];

  ngOnInit() {
    this.loadRolePermissions();
  }

  loadRolePermissions() {
    this.service.getByRoleId(this.roleId).subscribe(rps => {
      this.rolePermissions.set(rps);
    });

    // Este endpoint debería traer todos los permisos posibles, organizados por entidad
    // Asumimos que tú ya tienes este arreglo agrupado (PermissionGroup[])
    // Si no, dime y te ayudo a agruparlos desde un arreglo plano.
    // Por ahora usamos un mock temporal
    this.permissions.set([
      {
        entity: 'users',
        permissions: [
          { id: 1, entity: 'users', method: 'GET' },
          { id: 2, entity: 'users', method: 'POST' },
          { id: 3, entity: 'users', method: 'PUT' },
          { id: 4, entity: 'users', method: 'DELETE' }
        ]
      },
      {
        entity: 'roles',
        permissions: [
          { id: 5, entity: 'roles', method: 'GET' },
          { id: 6, entity: 'roles', method: 'POST' },
          { id: 7, entity: 'roles', method: 'PUT' },
          { id: 8, entity: 'roles', method: 'DELETE' }
        ]
      }
    ]);
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
