import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * 📍 Obtiene la URL base según el servicio solicitado
   * Usa keyof typeof environment.endpoints para evitar errores de tipado.
   */
  private getBaseUrl(service: keyof typeof environment.endpoints): string {
    return environment.endpoints[service];
  }

  /**
   * 🔐 Construye headers con token si existe
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  /**
   * 🔹 GET - Obtener datos
   * @param service nombre del servicio base (ej: 'users', 'cards', 'transactionsList')
   * @param endpoint endpoint adicional (ej: '/all', '/123')
   */
  get<T>(service: keyof typeof environment.endpoints, endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.getBaseUrl(service)}${endpoint}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * 🔸 POST - Crear datos
   * @param service nombre del servicio base
   * @param endpoint endpoint adicional
   * @param body cuerpo del request
   */
  post<T>(service: keyof typeof environment.endpoints, endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.getBaseUrl(service)}${endpoint}`, body, {
      headers: this.getHeaders()
    });
  }

  /**
   * 🔁 PUT - Actualizar datos
   * @param service nombre del servicio base
   * @param endpoint endpoint adicional
   * @param body cuerpo del request
   */
  put<T>(service: keyof typeof environment.endpoints, endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.getBaseUrl(service)}${endpoint}`, body, {
      headers: this.getHeaders()
    });
  }

  /**
   * ❌ DELETE - Eliminar datos
   * @param service nombre del servicio base
   * @param endpoint endpoint adicional
   */
  delete<T>(service: keyof typeof environment.endpoints, endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.getBaseUrl(service)}${endpoint}`, {
      headers: this.getHeaders()
    });
  }
}
