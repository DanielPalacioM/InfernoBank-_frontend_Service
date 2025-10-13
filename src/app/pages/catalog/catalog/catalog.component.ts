import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // <-- aquí
import { CatalogService } from '../../../services/catalog/catalog.service';
import { Card } from '../../../services/catalog/catalog.service'; 

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], // <-- agregar CurrencyPipe aquí
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  cards: Card[] = [];
  loading = false;

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.loading = true;
    this.catalogService.getCards().subscribe({
      next: (res) => {
        this.cards = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando cards:', err);
        this.loading = false;
      }
    });
  }
}
