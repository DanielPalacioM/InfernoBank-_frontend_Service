import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../services/payment/payment.service';
import { CardService } from '../../../services/cardService/card-service/card.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  cardId: string | null = null;

  constructor(
    private paymentService: PaymentService,
    private cardService: CardService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    const nav = history.state;
    this.service = nav.service;

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('❌ No se encontró userId en localStorage.');
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Obtener la tarjeta del usuario autenticado
    this.cardService.getCardsByUser(userId).subscribe({
      next: (cards) => {
        console.log('💳 Tarjetas del usuario:', cards);

        if (cards && cards.length > 0) {
          // ✅ Usa la primera tarjeta activa (puedes cambiar la lógica si es necesario)
          this.cardId = cards[0].cardId;
          console.log('✅ Card ID seleccionado:', this.cardId);
        } else {
          console.warn('⚠️ El usuario no tiene tarjetas registradas.');
        }
      },
      error: (err) => {
        console.error('💥 Error al obtener tarjetas del usuario:', err);
      }
    });
  }

  pagar() {
    if (!this.cardId) {
      console.error('⚠️ No hay cardId disponible, no se puede procesar el pago.');
      return;
    }

    this.loading = true;

    const body = {
      cardId: this.cardId,
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

  verificarEstado(traceId: string) {
    console.log(`⏳ Esperando 4 segundos antes de consultar el estado del pago (${traceId})...`);
    setTimeout(() => {
      let intentos = 0;
      const maxIntentos = 10;

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
      }, 3000);
    }, 4000);
  }

  goBack() {
    this.location.back();
  }
}
