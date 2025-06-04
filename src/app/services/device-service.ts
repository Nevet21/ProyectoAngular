import { Injectable } from '@angular/core';
import { Device } from '../models/device';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private http: HttpClient) {}

  list(): Observable<Device[]> {
    return this.http.get<Device[]>(`${enviroment.url_ms_security}/devices`);
  }

  view(id: number): Observable<Device> {
    return this.http.get<Device>(`${enviroment.url_ms_security}/devices/${id}`);
  }

  create(newDevice: Device): Observable<Device> {
    delete newDevice.id;
    return this.http.post<Device>(`${enviroment.url_ms_security}/devices`, newDevice);
  }

  update(device: Device): Observable<Device> {
    return this.http.put<Device>(`${enviroment.url_ms_security}/devices/${device.id}`, device);
  }

  delete(id: number): Observable<Device> {
    return this.http.delete<Device>(`${enviroment.url_ms_security}/devices/${id}`);
  }
}
