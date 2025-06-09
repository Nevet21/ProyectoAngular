import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { UserRole } from '../models/user-role';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private baseUrl = `${enviroment.url_ms_security}/user-roles`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las relaciones usuario-rol
   */
  getAll(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.baseUrl}`);
  }
  getByRole(roleId: number): Observable<UserRole[]> {
  return this.http.get<UserRole[]>(`${this.baseUrl}/role/${roleId}`);
}



  /**
   * Obtener relación específica por ID
   */
  getById(userRoleId: string): Observable<UserRole> {
    return this.http.get<UserRole>(`${this.baseUrl}/${userRoleId}`);
  }

  getUserById(userId: number) {
  return this.http.get<{ id: number; name: string; email: string }>(
    `${enviroment.url_ms_security}/users/${userId}`
  );
}


  /**
   * Obtener los roles que tiene un usuario
   */
  getRolesByUser(userId: number): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.baseUrl}/user/${userId}`);
  }

  /**
   * Obtener los usuarios que tienen un determinado rol
   */
  getUsersByRole(roleId: number): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${this.baseUrl}/role/${roleId}`);
  }

  /**
   * Crear una relación usuario-rol
   */
  create(userId: number, roleId: number, dates: { startAt: string, endAt: string }): Observable<UserRole> {
    return this.http.post<UserRole>(
      `${this.baseUrl}/user/${userId}/role/${roleId}`,
      dates
    );
  }

  /**
   * Actualizar fechas de una relación usuario-rol
   */
  update(userRoleId: string, data: { startAt?: string, endAt?: string }): Observable<UserRole> {
    return this.http.put<UserRole>(`${this.baseUrl}/${userRoleId}`, data);
  }

  /**
   * Eliminar relación usuario-rol por ID
   */
  delete(userRoleId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${userRoleId}`);
  }
}
