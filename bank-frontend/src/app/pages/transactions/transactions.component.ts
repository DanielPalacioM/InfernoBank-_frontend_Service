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
  transferData = { destination: '', amount: 0 };

  constructor(private txService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.txService.getUserTransactions(userId).subscribe({
      next: (res) => this.transactions = res || [],
      error: (err) => console.error(err)
    });
  }

  createTransaction() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.txService.createTransaction(userId, this.transferData).subscribe({
      next: () => {
        alert('Transferencia realizada');
        this.loadTransactions();
      },
      error: (err) => console.error(err)
    });
  }
}
