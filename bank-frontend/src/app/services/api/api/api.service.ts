import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private getBaseUrl(service: 'users' | 'cards' | 'transactions'): string {
    return environment.endpoints[service];
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  get<T>(service: 'users' | 'cards' | 'transactions', endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.getBaseUrl(service)}${endpoint}`, { headers: this.getHeaders() });
  }

  post<T>(service: 'users' | 'cards' | 'transactions', endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.getBaseUrl(service)}${endpoint}`, body, { headers: this.getHeaders() });
  }

  put<T>(service: 'users' | 'cards' | 'transactions', endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.getBaseUrl(service)}${endpoint}`, body, { headers: this.getHeaders() });
  }

  delete<T>(service: 'users' | 'cards' | 'transactions', endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.getBaseUrl(service)}${endpoint}`, { headers: this.getHeaders() });
  }
}
