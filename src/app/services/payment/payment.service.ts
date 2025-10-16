import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentUrl = environment.endpoints.payment;
  private statusUrl = environment.endpoints.status;

  constructor(private http: HttpClient) {}

  // ✅ Realizar el pago
  realizarPago(data: any): Observable<any> {
    return this.http.post<any>(this.paymentUrl, data);
  }

  // ✅ Consultar estado del pago
  consultarEstado(traceId: string): Observable<any> {
    return this.http.get<any>(`${this.statusUrl}/${traceId}`);
  }
}
