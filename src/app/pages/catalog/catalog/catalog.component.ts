import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CatalogService, Card } from '../../../services/catalog/catalog.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  servicios: Card[] = [];
  loading = false;
  error = false;

  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private location:Location,
  ) {}

  ngOnInit(): void {
    this.loadServicios();
  }

  loadServicios(): void {
    this.loading = true;
    this.error = false;

    this.catalogService.getCards().subscribe({
      next: (res) => {
        this.servicios = res;
        console.log('✅ Servicios cargados:', res);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error cargando servicios:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  pagar(servicio: Card): void {
    this.router.navigate(['/payment'], {
      state: {
        cardId: servicio.id,
        service: servicio
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
