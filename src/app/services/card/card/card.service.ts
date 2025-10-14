import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = `${environment.endpoints.cards}`;

  constructor(private http: HttpClient) {}

  // 🔹 Obtener todas las tarjetas de un usuario
  getCards(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Card/user/${userId}`);
  }

  // 🔹 Crear tarjeta (usa /Credit/Card o /Debit/Card)
  createCard(userId: string, type: 'CREDIT' | 'DEBIT'): Observable<any> {
    const endpoint = type === 'CREDIT' ? 'Credit/Card/create' : 'Debit/Card/create';
    return this.http.post(`${this.apiUrl}/${endpoint}`, { userId });
  }

  // 🔹 Activar tarjeta (usa el endpoint que ya confirmaste)
  activateCard(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Credit/Card/activate`, { userId });
  }

  // 🔹 Agregar saldo (para tarjetas débito)
  saveTransaction(cardId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Debit/Card/add-balance`, { cardId, amount });
  }

  // 🔹 Pagar crédito
  payCredit(cardId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Credit/Card/pay`, { cardId, amount });
  }

  // 🔹 Obtener reporte
  getReport(cardId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Card/${cardId}/report`);
  }
}
