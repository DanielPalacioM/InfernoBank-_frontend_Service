import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'https://tu-api.com/cards'; // ajusta la URL

  constructor(private http: HttpClient) {}

  getCards(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getCard(cardId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cardId}`);
  }

  createCard(userId: string, type: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, { userId, type });
  }

  activateCard(cardId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/activate/${cardId}`, {});
  }

  saveTransaction(cardId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${cardId}/add-balance`, { amount });
  }

  payCredit(cardId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${cardId}/pay-credit`, { amount });
  }

  getReport(cardId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cardId}/report`);
  }
}
