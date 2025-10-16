import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';

export interface Card {
  id: string;
  name: string;
  description: string;
  price?: number;
  categoria?: string;
  proveedor?: string;
  servicio?: string;
  plan?: string;
  precio_mensual?: number;
  detalles?: string;
  estado?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  // ✅ Endpoint correcto: usa el de 'prod', no 'dev'
  private baseUrl = 'https://ilnbbbe8p3.execute-api.us-east-1.amazonaws.com/prod/catalog';

  constructor(private http: HttpClient) {}

  // ✅ Debe ser GET, no POST
  getCards(): Observable<Card[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((res) =>
        res.map((c) => ({
          id: c['"ID"']?.replace(/"/g, '') || '',
          name: c['"Servicio"']?.replace(/"/g, '') || 'Sin nombre',
          description: c['"Velocidad/Detalles"']?.replace(/"/g, '') || 'Sin descripción',
          price: Number(c['"Preecio Mensual"']?.replace(/"/g, '') || 0),
          categoria: c['"Categoria"']?.replace(/"/g, ''),
          proveedor: c['"proveedor"']?.replace(/"/g, ''),
          servicio: c['"Servicio"']?.replace(/"/g, ''),
          plan: c['"Plan"']?.replace(/"/g, ''),
          precio_mensual: Number(c['"Preecio Mensual"']?.replace(/"/g, '') || 0),
          detalles: c['"Velocidad/Detalles"']?.replace(/"/g, ''),
          estado: c['"Estado"']?.replace(/"/g, '')
        }))
      )
    );
  }

  getCardById(cardId: string): Observable<Card> {
    return this.http.get<Card>(`${this.baseUrl}/${cardId}`);
  }
}
