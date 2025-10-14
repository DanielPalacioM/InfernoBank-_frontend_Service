import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction/transaction/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];

  // 📦 Datos para los formularios
  addMoneyData = { cardId: '', amount: 0 };
  purchaseData = { cardId: '', amount: 0, merchant: '' };

  constructor(private txService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  // 📜 Cargar historial de transacciones
  loadTransactions() {
    this.txService.getTransactions().subscribe({
      next: (res) => {
        this.transactions = res || [];
        console.log('Transacciones cargadas:', this.transactions);
      },
      error: (err) => console.error('Error al obtener transacciones:', err)
    });
  }

  // 💳 Recargar dinero
  addMoney() {
    if (!this.addMoneyData.cardId || !this.addMoneyData.amount) {
      alert('Por favor completa los campos de recarga.');
      return;
    }

    this.txService.addMoney(this.addMoneyData.cardId, this.addMoneyData.amount).subscribe({
      next: (res) => {
        alert('💰 Dinero agregado con éxito');
        console.log('Respuesta:', res);
        this.loadTransactions();
      },
      error: (err) => {
        console.error('Error al agregar dinero:', err);
        alert('Error al agregar dinero ❌');
      }
    });
  }

  // 🛒 Realizar compra
  // 🛒 Realizar compra
makePurchase() {
  const { cardId, amount, merchant } = this.purchaseData;

  if (!cardId || !amount || !merchant) {
    alert('Por favor completa todos los campos de compra.');
    return;
  }

  this.txService.makePurchase({ cardId, amount, merchant }).subscribe({
    next: (res) => {
      alert('🛒 Compra realizada con éxito');
      console.log('Respuesta:', res);
      this.loadTransactions();
    },
    error: (err) => {
      console.error('Error al realizar compra:', err);
      alert('Error al realizar la compra ❌');
    }
  });
}
}
