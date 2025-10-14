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

  // 🔹 Cargar todas las tarjetas del usuario
  loadCards() {
    const userId = 'b31e7bd3-0b03-48be-a720-de1d4ca4a96c'; // temporal
    this.cardService.getCards(userId).subscribe({
      next: (res: any) => {
        console.log('💳 Tarjetas obtenidas:', res);
        this.cards = Array.isArray(res) ? res : [res];
      },
      error: (err) => console.error('❌ Error al cargar tarjetas:', err)
    });
  }

  // 🔹 Crear tarjeta nueva
  createCard(type: 'DEBIT' | 'CREDIT') {
    const userId = 'b31e7bd3-0b03-48be-a720-de1d4ca4a96c';
    this.cardService.createCard(userId, type).subscribe({
      next: () => {
        alert(`✅ Tarjeta ${type} creada correctamente`);
        this.loadCards();
      },
      error: (err) => console.error('❌ Error al crear tarjeta:', err)
    });
  }

  // 🔹 Activar tarjeta
  activateCard(userId: string) {
    this.cardService.activateCard(userId).subscribe({
      next: () => alert('⚙️ Tarjeta activada correctamente'),
      error: (err) => console.error('❌ Error al activar tarjeta:', err)
    });
  }

  // 🔹 Agregar saldo (solo débito)
  saveTransaction(cardId: string) {
    this.cardService.saveTransaction(cardId, this.addAmount).subscribe({
      next: () => alert('💵 Saldo agregado exitosamente'),
      error: (err) => console.error('❌ Error al agregar saldo:', err)
    });
  }

  // 🔹 Pagar crédito
  payCredit(cardId: string) {
    this.cardService.payCredit(cardId, this.payAmount).subscribe({
      next: () => alert('💰 Pago realizado correctamente'),
      error: (err) => console.error('❌ Error al pagar crédito:', err)
    });
  }

  // 🔹 Generar reporte
  getReport(cardId: string) {
    this.cardService.getReport(cardId).subscribe({
      next: (res: any) => {
        alert('📊 Reporte generado y enviado al correo');
        console.log(res);
      },
      error: (err) => console.error('❌ Error al generar reporte:', err)
    });
  }
}
