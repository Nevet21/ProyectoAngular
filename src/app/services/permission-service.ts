import { Injectable } from '@angular/core';
import { Permission } from '../models/permission';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

const PERMISSIONS_STORAGE_KEY = 'app_permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions: Permission[] = [];

  constructor(private http: HttpClient) {
    // Cargar permisos desde sessionStorage al iniciar el servicio
    const stored = sessionStorage.getItem(PERMISSIONS_STORAGE_KEY);
    if (stored) {
      try {
        this.permissions = JSON.parse(stored);
      } catch {
        this.permissions = [];
      }
    }
  }

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

  setPermissions(permissions: Permission[]) {
    this.permissions = permissions;
    // Guardar en sessionStorage
    sessionStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(permissions));
  }

  getPermissions(): Permission[] {
    return this.permissions;
  }

  clearPermissions() {
    this.permissions = [];
    sessionStorage.removeItem(PERMISSIONS_STORAGE_KEY);
  }
}
