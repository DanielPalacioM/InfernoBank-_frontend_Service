import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; 
import { Observable, map } from 'rxjs';

export interface Card {
  id: string;
  name: string;
  description: string;
  price?: number;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private baseUrl = environment.endpoints.catalog;

  constructor(private http: HttpClient) {}

  // Obtener todas las cards
  getCards(): Observable<Card[]> {
    return this.http.get<any[]>(`${this.baseUrl}/card`).pipe(
      map((res) => res.map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        price: c.price || 0
      })))
    );
  }

  // Obtener card por ID
  getCardById(cardId: string): Observable<Card> {
    return this.http.get<Card>(`${this.baseUrl}/${cardId}`);
  }
}
