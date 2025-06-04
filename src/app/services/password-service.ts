import { Injectable } from '@angular/core';
import { Password } from '../models/password';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private http: HttpClient) {}

  list(): Observable<Password[]> {
    return this.http.get<Password[]>(`${enviroment.url_ms_security}/passwords`);
  }

  view(id: number): Observable<Password> {
    return this.http.get<Password>(`${enviroment.url_ms_security}/passwords/${id}`);
  }

  create(newPassword: Password): Observable<Password> {
    delete newPassword.id;
    return this.http.post<Password>(`${enviroment.url_ms_security}/passwords`, newPassword);
  }

  update(password: Password): Observable<Password> {
    return this.http.put<Password>(`${enviroment.url_ms_security}/passwords/${password.id}`, password);
  }

  delete(id: number): Observable<Password> {
    return this.http.delete<Password>(`${enviroment.url_ms_security}/passwords/${id}`);
  }
}
