import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) {}

  list(): Observable<Role[]> {
    return this.http.get<Role[]>(`${enviroment.url_ms_security}/roles`);
  }

  view(id: number): Observable<Role> {
    return this.http.get<Role>(`${enviroment.url_ms_security}/roles/${id}`);
  }

  create(newRole: Role): Observable<Role> {
    delete newRole.id;
    return this.http.post<Role>(`${enviroment.url_ms_security}/roles`, newRole);
  }

  update(role: Role): Observable<Role> {
    return this.http.put<Role>(`${enviroment.url_ms_security}/roles/${role.id}`, role);
  }

  delete(id: number): Observable<Role> {
    return this.http.delete<Role>(`${enviroment.url_ms_security}/roles/${id}`);
  }
}
