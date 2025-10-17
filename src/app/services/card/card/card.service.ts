import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  // ✅ Activar tarjeta (ya existente)
  activateCreditCard(userId: string): Observable<any> {
    return this.http.post(environment.endpoints.creditActivate, { userId }, { headers: this.getHeaders() });
  }

  // ✅ Nuevo: obtener tarjetas del usuario logueado
  getCardsByUser(userId: string): Observable<any[]> {
    const url = `https://x8ewzbrr6k.execute-api.us-east-1.amazonaws.com/Card/user/${userId}`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }
}
