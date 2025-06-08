import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { Observable, catchError, throwError } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment'; // Corregido nombre de archivo
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = `${enviroment.url_ms_security}/addresses`;

  constructor(private http: HttpClient) {}

  list(): Observable<Address[]> {
    return this.http.get<Address[]>(this.baseUrl).pipe(
      catchError(error => this.handleError('Error al listar direcciones', error))
    );
  }

  view(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => this.handleError('Error al obtener dirección', error))
    );
  }

  getByUserId(userId: number): Observable<Address> { // Cambiado nombre y tipo de retorno
    return this.http.get<Address>(`${this.baseUrl}/user/${userId}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          return throwError(() => 'Usuario no encontrado');
        }
        return this.handleError('Error al obtener dirección del usuario', error);
      })
    );
  }

  create(addressData: Omit<Address, 'id'>, userId: number): Observable<Address> {
    return this.http.post<Address>(`${this.baseUrl}/user/${userId}`, addressData).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError(() => error.error?.error || 'El usuario ya tiene una dirección');
        }
        return this.handleError('Error al crear dirección', error);
      })
    );
  }

  update(address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.baseUrl}/${address.id}`, address).pipe(
      catchError(error => this.handleError('Error al actualizar dirección', error))
    );
  }

  delete(id: number): Observable<void> { // Cambiado tipo de retorno
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => this.handleError('Error al eliminar dirección', error))
    );
  }

  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(() => message);
  }
}