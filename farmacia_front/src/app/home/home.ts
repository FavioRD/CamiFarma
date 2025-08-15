import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService, Producto } from '../producto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Lista de Productos</h2>
    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Marca</th>
          <th>Presentación</th>
          <th>Precio Venta</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of productos">
          <td>{{ p.id }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ p.marca }}</td>
          <td>{{ p.presentacion }}</td>  
          <td>S/.{{ p.precioVenta}}</td>
          <td>{{ p.stock }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al obtener productos', err)
    });
  }
}
