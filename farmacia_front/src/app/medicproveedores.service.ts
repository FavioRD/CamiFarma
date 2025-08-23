import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProveedorMedicamento {
  id?: number;
  proveedor: { id: number }; 
  medicamento: { id: number }; 
  precioCompra: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProveedorMedicamentoService {
  private apiUrl = 'http://localhost:8080/api/provemedi';

  constructor(private http: HttpClient) {}

  agregar(proveedorMedicamento: ProveedorMedicamento): Observable<ProveedorMedicamento> {
    return this.http.post<ProveedorMedicamento>(`${this.apiUrl}`, proveedorMedicamento);
  }

  obtenerPorProveedor(proveedorId: number): Observable<ProveedorMedicamento[]> {
    return this.http.get<ProveedorMedicamento[]>(`${this.apiUrl}/proveedor/${proveedorId}`);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
