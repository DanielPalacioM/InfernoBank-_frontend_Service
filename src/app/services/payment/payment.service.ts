import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; 
import { Observable, map } from 'rxjs';

export interface Payment {
  id: string;
  amount: number;
  status: string;
  traceId?: string;
  date?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private baseUrl = environment.endpoints.payment;

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<any[]>(`${this.baseUrl}/payment`).pipe(
      map((res) => res.map((p) => ({
        id: p.id,
        amount: p.amount,
        status: p.status,
        traceId: p.traceId,
        date: p.date
      })))
    );
  }

  getPaymentStatus(traceId: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/status/${traceId}`);
  }
}
