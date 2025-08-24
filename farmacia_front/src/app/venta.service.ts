import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductoVentaDTO {
  idProducto: number;
  cantidad: number;
}

export interface VentaDTO {
  productos: ProductoVentaDTO[];
}

export interface Venta {
  id: number;
  fecha: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) {}

  // Registrar venta
  registrarVenta(venta: VentaDTO): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/registrar`, venta);
  }

  // Listar ventas
  listarVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrl}/listar`);
  }
}
