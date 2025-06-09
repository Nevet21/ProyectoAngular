import { Injectable } from '@angular/core';
import { RolePermission } from '../models/role-permission';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {
  constructor(private http: HttpClient) {}

  list(): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${enviroment.url_ms_security}/role-permissions`);
  }

  view(id: string): Observable<RolePermission> {
    return this.http.get<RolePermission>(`${enviroment.url_ms_security}/role-permissions/${id}`);
  }

  // Usa los IDs como en el backend: /role-permissions/role/:role_id/permission/:permission_id
  create(roleId: number, permissionId: number): Observable<RolePermission> {
    return this.http.post<RolePermission>(
      `${enviroment.url_ms_security}/role-permissions/role/${roleId}/permission/${permissionId}`,
      {} // Si el backend no espera data en el body
    );
  }

  // Elimina usando role_id y permission_id
  delete(roleId: number, permissionId: number): Observable<any> {
    return this.http.delete(
      `${enviroment.url_ms_security}/role-permissions/role/${roleId}/permission/${permissionId}`
    );
  }

  // Opcional: listar permisos de un rol
  getByRoleId(roleId: number): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(
      `${enviroment.url_ms_security}/role-permissions/role/${roleId}`
    );
  }

  // Opcional: listar roles que tienen un permiso
  getByPermissionId(permissionId: number): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(
      `${enviroment.url_ms_security}/role-permissions/permission/${permissionId}`
    );
  }
}
