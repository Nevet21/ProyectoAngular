import { Injectable } from '@angular/core';
import { Session } from '../models/session';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) {}

  list(): Observable<Session[]> {
    return this.http.get<Session[]>(`${enviroment.url_ms_security}/sessions`);
  }

  view(id: string): Observable<Session> {
    return this.http.get<Session>(`${enviroment.url_ms_security}/sessions/${id}`);
  }

  create(newSession: Session): Observable<Session> {
    delete newSession.id;
    return this.http.post<Session>(`${enviroment.url_ms_security}/sessions`, newSession);
  }

  update(session: Session): Observable<Session> {
    return this.http.put<Session>(`${enviroment.url_ms_security}/sessions/${session.id}`, session);
  }

  delete(id: string): Observable<Session> {
    return this.http.delete<Session>(`${enviroment.url_ms_security}/sessions/${id}`);
  }
}
