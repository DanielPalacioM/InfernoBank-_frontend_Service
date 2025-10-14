import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  /** 
   * 💳 Endpoints base definidos en environment.ts 
   * - apiActionsUrl → para operaciones de guardar o comprar
   * - apiListUrl → para consultar transacciones
   */
  private readonly apiActionsUrl = environment.endpoints.transactionsActions;
  private readonly apiListUrl = environment.endpoints.transactionsList;

  constructor(private http: HttpClient) {}

  /** 🔐 Construye headers con token si existe */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  /** 💰 Recargar dinero en la tarjeta */
  addMoney(cardId: string, amount: number): Observable<any> {
    const body = { merchant: 'SAVING', amount };
    const url = `${this.apiActionsUrl}/save/${cardId}`;
    return this.http.post(url, body, { headers: this.getHeaders() });
  }

  /** 🛒 Realizar una compra */
  makePurchase(data: { cardId: string; amount: number; merchant: string }): Observable<any> {
    const url = `${this.apiActionsUrl}/purchase`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }

  /** 📜 Consultar historial de transacciones */
  getTransactions(): Observable<any> {
    const url = `${this.apiListUrl}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
