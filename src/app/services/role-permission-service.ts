import { Injectable } from '@angular/core';
import { RolePermission } from '../models/role-permission';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { GroupedPermission } from '../models/GroupedPermission'; // <== nuevo

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

  create(roleId: number, permissionId: number): Observable<RolePermission> {
    return this.http.post<RolePermission>(
      `${enviroment.url_ms_security}/role-permissions/role/${roleId}/permission/${permissionId}`,
      {}
    );
  }

  delete(roleId: number, permissionId: number): Observable<any> {
    return this.http.delete(
      `${enviroment.url_ms_security}/role-permissions/role/${roleId}/permission/${permissionId}`
    );
  }

  getByRoleId(roleId: number): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(
      `${enviroment.url_ms_security}/role-permissions/role/${roleId}`
    );
  }

  getByPermissionId(permissionId: number): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(
      `${enviroment.url_ms_security}/role-permissions/permission/${permissionId}`
    );
  }

  // ✅ Nuevo método: obtiene los permisos agrupados por entidad para un rol
  getGroupedPermissionsByRoleId(roleId: number): Observable<GroupedPermission[]> {
    return this.http.get<GroupedPermission[]>(
      `${enviroment.url_ms_security}/permissions/grouped/role/${roleId}`
    );
  }
}
