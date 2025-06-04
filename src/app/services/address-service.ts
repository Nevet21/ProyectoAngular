import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) {}

  list(): Observable<Address[]> {
    return this.http.get<Address[]>(`${enviroment.url_ms_security}/addresses`);
  }

  view(id: number): Observable<Address> {
    return this.http.get<Address>(`${enviroment.url_ms_security}/addresses/${id}`);
  }

  create(newAddress: Address): Observable<Address> {
    delete newAddress.id;
    return this.http.post<Address>(`${enviroment.url_ms_security}/addresses`, newAddress);
  }

  update(address: Address): Observable<Address> {
    return this.http.put<Address>(`${enviroment.url_ms_security}/addresses/${address.id}`, address);
  }

  delete(id: number): Observable<Address> {
    return this.http.delete<Address>(`${enviroment.url_ms_security}/addresses/${id}`);
  }
}
