import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  list(): Observable<User[]> {
    return this.http.get<User[]>(`${enviroment.url_ms_security}/users`);
  }

  view(id: number): Observable<User> {
    return this.http.get<User>(`${enviroment.url_ms_security}/users/${id}`);
  }

  create(newUser: User): Observable<User> {
    delete newUser.id;
    return this.http.post<User>(`${enviroment.url_ms_security}/users`, newUser);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${enviroment.url_ms_security}/users/${user.id}`, user);
  }

  delete(id: number): Observable<User> {
    return this.http.delete<User>(`${enviroment.url_ms_security}/users/${id}`);
  }
}
