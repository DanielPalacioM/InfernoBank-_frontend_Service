import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly apiActionsUrl = environment.endpoints.transactionsActions;
  private readonly apiListUrl = environment.endpoints.transactionsList;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  addMoney(cardId: string, amount: number): Observable<any> {
    const body = { merchant: 'SAVING', amount };
    const url = `${this.apiActionsUrl}/save/${cardId}`;
    return this.http.post(url, body, { headers: this.getHeaders() });
  }

  makePurchase(data: { cardId: string; amount: number; merchant: string }): Observable<any> {
    const url = `${this.apiActionsUrl}/purchase`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }

  getTransactions(): Observable<any> {
    return this.http.get(this.apiListUrl, { headers: this.getHeaders() });
  }
}
