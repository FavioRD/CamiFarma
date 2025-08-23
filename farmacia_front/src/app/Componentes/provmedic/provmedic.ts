import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProveedorMedicamentoService, ProveedorMedicamento } from '../../medicproveedores.service';
import { ProveedorService, Proveedor } from '../../proveedor.service';
import { ProductoService, Producto } from '../../producto.service';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-proveedor-medicamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './provmedic.html'
})
export class ProveedorMedicamentosComponent implements OnInit {
  proveedores: Proveedor[] = [];
  medicamentos: Producto[] = [];
  medicamentosProveedor: ProveedorMedicamento[] = [];

  nuevo: ProveedorMedicamento = { proveedorId: 0, medicamentoId: 0, precioCompra: 0 };

  constructor(
    private pmService: ProveedorMedicamentoService,
    private proveedorService: ProveedorService,
    private ProductoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarMedicamentos();
  }

  cargarProveedores() {
    this.proveedorService.getProveedores().subscribe(data => {
      this.proveedores = data;
    });
  }

  cargarMedicamentos() {
    this.ProductoService.getProductos().subscribe(data => {
      this.medicamentos = data;
    });
  }

  cargarMedicamentosProveedor(proveedorId: number) {
    this.pmService.obtenerPorProveedor(proveedorId).subscribe(data => {
      this.medicamentosProveedor = data;
    });
  }

  agregar() {
    this.pmService.agregar(this.nuevo).subscribe(() => {
      this.cargarMedicamentosProveedor(this.nuevo.proveedorId);
      this.nuevo = { proveedorId: 0, medicamentoId: 0, precioCompra: 0 };
    });
  }

  eliminar(id: number) {
    this.pmService.eliminar(id).subscribe(() => {
      this.cargarMedicamentosProveedor(this.nuevo.proveedorId);
    });
  }
}
