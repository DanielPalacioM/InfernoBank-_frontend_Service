import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card/card/card.service';
import confetti from 'canvas-confetti'; // 🎉 importamos la librería

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  userId = 'd398ab9c-04d0-428b-b9cb-c9b5b5a2b4d1';
  activated = false;
  loading = false;

  constructor(private cardService: CardService) {}

  activateCard() {
    this.loading = true;
    this.cardService.activateCreditCard(this.userId).subscribe({
      next: () => {
        this.activated = true;
        this.loading = false;

        // ✨ Mostrar mensaje
        alert('🎉 Tarjeta de crédito activada correctamente');

        // 🎊 Lanzar confeti
        this.launchConfetti();
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Error al activar tarjeta:', err);
        alert('❌ No se pudo activar la tarjeta');
      }
    });
  }

  private launchConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const colors = ['#0033a0', '#00a1e4', '#ffc300', '#00ffb3'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}
