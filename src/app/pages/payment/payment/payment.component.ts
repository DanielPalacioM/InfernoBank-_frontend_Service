import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Payment, PaymentService } from '../../../services/payment/payment.service';
import { NgFor, NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgFor, NgIf, AsyncPipe],
  templateUrl: './payment.component.html',
  styleUrls : ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  payments: Payment[] = [];
  loading = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.loading = true;
    this.paymentService.getPayments().subscribe({
      next: (res) => {
        this.payments = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando pagos:', err);
        this.loading = false;
      }
    });
  }
}
