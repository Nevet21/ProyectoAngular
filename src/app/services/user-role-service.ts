import { Injectable } from '@angular/core';
import { UserRole } from '../models/user-role';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  constructor(private http: HttpClient) {}

  list(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(`${enviroment.url_ms_security}/user-roles`);
  }

  view(id: string): Observable<UserRole> {
    return this.http.get<UserRole>(`${enviroment.url_ms_security}/user-roles/${id}`);
  }

  create(newUserRole: UserRole): Observable<UserRole> {
    delete newUserRole.id;
    return this.http.post<UserRole>(`${enviroment.url_ms_security}/user-roles`, newUserRole);
  }

  update(userRole: UserRole): Observable<UserRole> {
    return this.http.put<UserRole>(`${enviroment.url_ms_security}/user-roles/${userRole.id}`, userRole);
  }

  delete(id: string): Observable<UserRole> {
    return this.http.delete<UserRole>(`${enviroment.url_ms_security}/user-roles/${id}`);
  }
}
