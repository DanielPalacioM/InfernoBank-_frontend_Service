import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  /** 🧭 Selecciona la URL base según el servicio */
  private getBaseUrl(service: 'users' | 'cards' | 'transactions' | 'catalog' | 'payment'): string {
    return environment.endpoints[service];
  }

  /** 🪪 Construye encabezados con el token si existe */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // sincronizado con AuthService
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  /** 🔹 GET */
  get<T>(service: any, endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.getBaseUrl(service)}${endpoint}`, {
      headers: this.getHeaders()
    });
  }

  /** 🔸 POST */
  post<T>(service: any, endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.getBaseUrl(service)}${endpoint}`, body, {
      headers: this.getHeaders()
    });
  }

  /** 🔁 PUT */
  put<T>(service: any, endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.getBaseUrl(service)}${endpoint}`, body, {
      headers: this.getHeaders()
    });
  }

  /** ❌ DELETE */
  delete<T>(service: any, endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.getBaseUrl(service)}${endpoint}`, {
      headers: this.getHeaders()
    });
  }
}
