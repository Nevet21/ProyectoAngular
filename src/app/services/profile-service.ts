import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = `${enviroment.url_ms_security}/profiles`;

  constructor(private http: HttpClient) {}

  /** Lista todos los perfiles */
  list(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.baseUrl);
  }

  /** Ver perfil por ID */
  view(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/${id}`);
  }

  /** Ver perfil por ID de usuario */
  viewByUser(userId: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/user/${userId}`);
  }

  /** Crear perfil (requiere FormData y userId en la URL) */
  create(userId: number, data: { phone: string; photo?: File }): Observable<Profile> {
    const formData = new FormData();
    formData.append('phone', data.phone);
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    return this.http.post<Profile>(`${this.baseUrl}/user/${userId}`, formData);
  }

  /** Actualizar perfil (requiere FormData) */
  update(profileId: number, data: { phone?: string; photo?: File }): Observable<Profile> {
    const formData = new FormData();
    if (data.phone) {
      formData.append('phone', data.phone);
    }
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    return this.http.put<Profile>(`${this.baseUrl}/${profileId}`, formData);
  }

  /** Eliminar perfil */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
