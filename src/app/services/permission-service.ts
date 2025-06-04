import { Injectable } from '@angular/core';
import { Permission } from '../models/permission';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private http: HttpClient) {}

  list(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${enviroment.url_ms_security}/permissions`);
  }

  view(id: number): Observable<Permission> {
    return this.http.get<Permission>(`${enviroment.url_ms_security}/permissions/${id}`);
  }

  create(newPermission: Permission): Observable<Permission> {
    delete newPermission.id;
    return this.http.post<Permission>(`${enviroment.url_ms_security}/permissions`, newPermission);
  }

  update(permission: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${enviroment.url_ms_security}/permissions/${permission.id}`, permission);
  }

  delete(id: number): Observable<Permission> {
    return this.http.delete<Permission>(`${enviroment.url_ms_security}/permissions/${id}`);
  }
}
