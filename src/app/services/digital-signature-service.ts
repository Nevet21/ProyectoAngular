import { Injectable } from '@angular/core';
import { DigitalSignature } from '../models/digital-signature';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DigitalSignatureService {
  constructor(private http: HttpClient) {}

  list(): Observable<DigitalSignature[]> {
    return this.http.get<DigitalSignature[]>(`${enviroment.url_ms_security}/digital-signatures`);
  }

  view(id: number): Observable<DigitalSignature> {
    return this.http.get<DigitalSignature>(`${enviroment.url_ms_security}/digital-signatures/${id}`);
  }

  create(newSignature: DigitalSignature): Observable<DigitalSignature> {
    delete newSignature.id;
    return this.http.post<DigitalSignature>(`${enviroment.url_ms_security}/digital-signatures`, newSignature);
  }

  update(signature: DigitalSignature): Observable<DigitalSignature> {
    return this.http.put<DigitalSignature>(`${enviroment.url_ms_security}/digital-signatures/${signature.id}`, signature);
  }

  delete(id: number): Observable<DigitalSignature> {
    return this.http.delete<DigitalSignature>(`${enviroment.url_ms_security}/digital-signatures/${id}`);
  }
}
