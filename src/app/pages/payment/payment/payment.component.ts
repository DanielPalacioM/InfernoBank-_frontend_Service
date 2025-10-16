import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../services/payment/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  service: any;
  resultado: any;
  loading = false;

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit() {
    const nav = history.state;
    this.service = nav.service;
  }

  pagar() {
    this.loading = true;

    // ✅ Body igual al de Postman
    const body = {
      cardId: '716d8a01-ff15-4223-ba49-a7fe96801d41',
      service: this.service
    };

    this.paymentService.realizarPago(body).subscribe({
      next: (res: any) => {
        console.log('✅ Pago iniciado:', res);
        this.resultado = res;

        if (res.traceId) {
          this.verificarEstado(res.traceId);
        } else {
          console.error('⚠️ No se recibió traceId del pago.');
          this.loading = false;
        }
      },
      error: (err: any) => {
        console.error('❌ Error al iniciar pago:', err);
        this.loading = false;
      }
    });
  }

  // ✅ Espera antes de iniciar las consultas y reintenta hasta 10 veces
  verificarEstado(traceId: string) {
    console.log(`⏳ Esperando 4 segundos antes de consultar el estado del pago (${traceId})...`);
    setTimeout(() => {
      let intentos = 0;
      const maxIntentos = 10; // 🔁 aumentamos los intentos

      const intervalo = setInterval(() => {
        intentos++;

        this.paymentService.consultarEstado(traceId).subscribe({
          next: (estado: any) => {
            console.log('⌛ Estado actual del pago:', estado);

            if (estado.status === 'FINISH') {
              clearInterval(intervalo);
              console.log('💰 Pago completado con éxito');
              this.loading = false;
              this.router.navigate(['/catalog']);
            } else if (intentos >= maxIntentos) {
              clearInterval(intervalo);
              console.warn('⚠️ Se alcanzó el número máximo de intentos sin respuesta final.');
              this.loading = false;
            }
          },
          error: (err: any) => {
            if (err.status === 404) {
              console.warn(`⚠️ Intento ${intentos}/${maxIntentos}: traceId no encontrado (${traceId})`);
              // No corta el ciclo aún, puede aparecer en el siguiente intento
              if (intentos >= maxIntentos) {
                clearInterval(intervalo);
                console.error('❌ No se encontró el pago tras varios intentos.');
                this.loading = false;
              }
            } else {
              console.error('⚠️ Error consultando estado:', err);
              clearInterval(intervalo);
              this.loading = false;
            }
          }
        });
      }, 3000); // consulta cada 3 segundos
    }, 4000); // espera 4 segundos antes de la primera consulta
  }
}
