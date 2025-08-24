import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../producto.service';
import { FormsModule } from '@angular/forms';
import { VentasService, ProductoVentaDTO, VentaDTO } from '../../venta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventas-form',
  templateUrl: './ventas.html',
  standalone: true,
  imports: [ FormsModule,CommonModule],
})
export class VentasFormComponent implements OnInit {
  productosDisponibles: Producto[] = [];
  productosSeleccionados: ProductoVentaDTO[] = [];

  productoSeleccionado: number = 0;
  cantidad: number = 1;

  constructor(
    private productoService: ProductoService,
    private ventaService: VentasService
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productosDisponibles = data;
    });
  }

  agregarProducto() {
    if (this.productoSeleccionado && this.cantidad > 0) {
      this.productosSeleccionados.push({
        idProducto: this.productoSeleccionado,
        cantidad: this.cantidad
      });
      this.productoSeleccionado = 0;
      this.cantidad = 1;
    }
  }

  eliminarProducto(index: number) {
    this.productosSeleccionados.splice(index, 1);
  }

  registrarVenta() {
    const venta: VentaDTO = { productos: this.productosSeleccionados };

    this.ventaService.registrarVenta(venta).subscribe(total => {
      alert(`✅ Venta registrada con total: $${total}`);
      this.productosSeleccionados = []; // limpiar carrito
    });
  }
}
