import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  constructor(private http: HttpClient) {}

  list(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${enviroment.url_ms_security}/answers`);
  }

  view(id: number): Observable<Answer> {
    return this.http.get<Answer>(`${enviroment.url_ms_security}/answers/${id}`);
  }

  create(newAnswer: Answer): Observable<Answer> {
    delete newAnswer.id;
    return this.http.post<Answer>(`${enviroment.url_ms_security}/answers`, newAnswer);
  }

  update(answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(`${enviroment.url_ms_security}/answers/${answer.id}`, answer);
  }

  delete(id: number): Observable<Answer> {
    return this.http.delete<Answer>(`${enviroment.url_ms_security}/answers/${id}`);
  }
}
