import { Injectable } from '@angular/core';
import { SecurityQuestion } from '../models/security-question';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {
  constructor(private http: HttpClient) {}

  list(): Observable<SecurityQuestion[]> {
    return this.http.get<SecurityQuestion[]>(`${enviroment.url_ms_security}/security-questions`);
  }

  view(id: number): Observable<SecurityQuestion> {
    return this.http.get<SecurityQuestion>(`${enviroment.url_ms_security}/security-questions/${id}`);
  }

  create(newQuestion: SecurityQuestion): Observable<SecurityQuestion> {
    delete newQuestion.id;
    return this.http.post<SecurityQuestion>(`${enviroment.url_ms_security}/security-questions`, newQuestion);
  }

  update(question: SecurityQuestion): Observable<SecurityQuestion> {
    return this.http.put<SecurityQuestion>(`${enviroment.url_ms_security}/security-questions/${question.id}`, question);
  }

  delete(id: number): Observable<SecurityQuestion> {
    return this.http.delete<SecurityQuestion>(`${enviroment.url_ms_security}/security-questions/${id}`);
  }
}
