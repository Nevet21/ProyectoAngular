import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  list(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${enviroment.url_ms_security}/profiles`);
  }

  view(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${enviroment.url_ms_security}/profiles/${id}`);
  }

  create(newProfile: Profile): Observable<Profile> {
    delete newProfile.id;
    return this.http.post<Profile>(`${enviroment.url_ms_security}/profiles`, newProfile);
  }

  update(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${enviroment.url_ms_security}/profiles/${profile.id}`, profile);
  }

  delete(id: number): Observable<Profile> {
    return this.http.delete<Profile>(`${enviroment.url_ms_security}/profiles/${id}`);
  }
}
