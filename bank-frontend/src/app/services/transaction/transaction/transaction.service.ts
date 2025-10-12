import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment'; 

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiBase = `${environment.endpoints.transactions}`;

  constructor(private http: HttpClient) {}

  getUserTransactions(userId: string): Observable<any> {
    return this.http.get(`${this.apiBase}/user/${userId}`);
  }

  createTransaction(userId: string, data: { destination: string; amount: number }): Observable<any> {
    return this.http.post(`${this.apiBase}/create`, { userId, ...data });
  }

  getTransactionById(transactionId: string): Observable<any> {
    return this.http.get(`${this.apiBase}/${transactionId}`);
  }

  filterTransactions(userId: string, filters: any): Observable<any> {
    return this.http.post(`${this.apiBase}/filter/${userId}`, filters);
  }

  deleteTransaction(transactionId: string): Observable<any> {
    return this.http.delete(`${this.apiBase}/${transactionId}`);
  }
}
