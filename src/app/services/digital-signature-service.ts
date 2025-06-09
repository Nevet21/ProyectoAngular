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

create(userId: number, photo: File): Observable<DigitalSignature> {
  const formData = new FormData();
  formData.append('photo', photo);

  return this.http.post<DigitalSignature>(
    `${enviroment.url_ms_security}/digital-signatures/user/${userId}`,
    formData
  );
}


updateFormData(signatureId: number, photo: File): Observable<DigitalSignature> {
  const formData = new FormData();
  formData.append('photo', photo);

  return this.http.put<DigitalSignature>(
    `${enviroment.url_ms_security}/digital-signatures/${signatureId}`,
    formData
  );
}


  delete(id: number): Observable<DigitalSignature> {
    return this.http.delete<DigitalSignature>(`${enviroment.url_ms_security}/digital-signatures/${id}`);
  }
  getByUserId(userId: number): Observable<DigitalSignature> {
  return this.http.get<DigitalSignature>(`${enviroment.url_ms_security}/digital-signatures/user/${userId}`);
}

}
