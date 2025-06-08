import { Injectable } from '@angular/core';
import { Password } from '../models/password';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseUrl = `${enviroment.url_ms_security}/passwords`;

  constructor(private http: HttpClient) {}

  // List all passwords
  list(): Observable<Password[]> {
    return this.http.get<Password[]>(`${this.baseUrl}`);
  }

  // Get password by ID
  view(id: number): Observable<Password> {
    return this.http.get<Password>(`${this.baseUrl}/${id}`);
  }

  // Create a new password for a specific user
  create(userId: number, newPassword: Password): Observable<Password> {
    delete newPassword.id;
    return this.http.post<Password>(`${this.baseUrl}/user/${userId}`, newPassword);
  }

  // Update a password by ID
  update(password: Password): Observable<Password> {
    return this.http.put<Password>(`${this.baseUrl}/${password.id}`, password);
  }

  // Delete a password by ID
  delete(id: number): Observable<Password> {
    return this.http.delete<Password>(`${this.baseUrl}/${id}`);
  }

  // List all passwords by user ID
  listByUserId(userId: number): Observable<Password[]> {
    return this.http.get<Password[]>(`${this.baseUrl}/user/${userId}`);
  }
}

