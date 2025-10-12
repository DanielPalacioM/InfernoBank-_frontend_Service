import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../services/card/card/card.service'; 

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cards.component.html'
})
export class CardsComponent {
  cards: any[] = [];
  addAmount = 0;
  payAmount = 0;

  constructor(private cardService: CardService) {}

  loadCards() {
    // Simula obtener todas las tarjetas de un usuario
    const userId = 'b31e7bd3-0b03-48be-a720-de1d4ca4a96c'; // <- temporal
    this.cardService.getCard(userId).subscribe({
      next: (res: any) => (this.cards = res),
      error: (err) => console.error(err)
    });
  }

  createCard(type: 'DEBIT' | 'CREDIT') {
    const userId = 'b31e7bd3-0b03-48be-a720-de1d4ca4a96c';
    this.cardService.createCard(userId, type).subscribe({
      next: () => {
        alert(`Solicitud de tarjeta ${type} enviada`);
        this.loadCards();
      },
      error: (err) => console.error(err)
    });
  }


  

  activateCard(userId: string) {
    this.cardService.activateCard(userId).subscribe({
      next: () => alert('Tarjeta activada correctamente'),
      error: (err) => console.error(err)
    });
  }

  saveTransaction(cardId: string) {
    this.cardService.saveTransaction(cardId, this.addAmount).subscribe({
      next: () => alert('Saldo agregado exitosamente'),
      error: (err) => console.error(err)
    });
  }

  payCredit(cardId: string) {
    this.cardService.payCredit(cardId, this.payAmount)

  }


  getReport(cardId: string) {
  this.cardService.getReport(cardId).subscribe({
    next: (res: any) => {
      alert('Reporte generado y enviado al correo');
      console.log(res);
    },
    error: (err) => console.error(err)
  });
}

}