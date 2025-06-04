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

  create(newRP: RolePermission): Observable<RolePermission> {
    delete newRP.id;
    return this.http.post<RolePermission>(`${enviroment.url_ms_security}/role-permissions`, newRP);
  }

  update(rp: RolePermission): Observable<RolePermission> {
    return this.http.put<RolePermission>(`${enviroment.url_ms_security}/role-permissions/${rp.id}`, rp);
  }

  delete(id: string): Observable<RolePermission> {
    return this.http.delete<RolePermission>(`${enviroment.url_ms_security}/role-permissions/${id}`);
  }
}
