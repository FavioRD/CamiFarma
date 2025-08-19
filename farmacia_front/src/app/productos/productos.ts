import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, Producto } from '../producto.service';
import { Camfarm } from "../camfarm/camfarm";
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  template: `
  <div class="flex bg-gray-100">
  <app-navbar class="w-64 bg-orange-600 text-white"></app-navbar>
  <div class="flex-1 bg-gradient-to-b from-orange-50 to-yellow-50 overflow-y-auto">
    <h2 class="text-3xl font-bold text-center mb-10 text-orange-600">
  📦 Inventario de Medicamentos
</h2>

<div class="flex flex-col lg:flex-row gap-8 justify-center">
  <!-- Formulario -->
  <form (ngSubmit)="guardarProducto()" 
        class="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-orange-100">
    <h2 class="text-xl font-bold mb-4 text-gray-700">
      {{ editando ? '✏️ Editar Producto' : '➕ Agregar Producto' }}
    </h2>

    <input [(ngModel)]="producto.nombre" name="nombre" placeholder="Nombre" required
      class="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition">
    <input [(ngModel)]="producto.marca" name="marca" placeholder="Marca" required
      class="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition">
    <input [(ngModel)]="producto.presentacion" name="presentacion" placeholder="Presentación" required
      class="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition">
    <input [(ngModel)]="producto.precioVenta" name="precioVenta" type="number" placeholder="Precio" required
      class="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition">
    <input [(ngModel)]="producto.stock" name="stock" type="number" placeholder="Stock" required
      class="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition">

    <div class="flex gap-3 pt-2">
      <button type="submit"
        class="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md transition">
        {{ editando ? 'Actualizar' : 'Agregar' }}
      </button>
      <button *ngIf="editando" type="button" (click)="cancelarEdicion()"
        class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md transition">
        Cancelar
      </button>
    </div>
  </form>

  <!-- Tabla -->
  <div class="w-full overflow-x-auto bg-white rounded-2xl shadow-lg border border-orange-100">
    <table class="min-w-full text-left border-collapse">
      <thead class="bg-orange-500 text-white">
        <tr>
          <th class="py-3 px-4">ID</th>
          <th class="py-3 px-4">Nombre</th>
          <th class="py-3 px-4">Marca</th>
          <th class="py-3 px-4">Presentación</th>
          <th class="py-3 px-4">Precio Venta</th>
          <th class="py-3 px-4">Stock</th>
          <th class="py-3 px-4 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of productos" 
            class="border-b hover:bg-orange-50 transition">
          <td class="py-2 px-4">{{ p.id }}</td>
          <td class="py-2 px-4 font-semibold text-gray-700">{{ p.nombre }}</td>
          <td class="py-2 px-4">{{ p.marca }}</td>
          <td class="py-2 px-4">{{ p.presentacion }}</td>
          <td class="py-2 px-4 font-medium text-orange-600">S/. {{ p.precioVenta }}</td>
          <td class="py-2 px-4">
            <span [ngClass]="{
                'text-green-600 font-semibold': p.stock > 20,
                'text-yellow-600 font-semibold': p.stock > 5 && p.stock <= 20,
                'text-red-600 font-bold': p.stock <= 5
              }">
              {{ p.stock }}
            </span>
          </td>
          <td class="py-2 px-4 flex gap-2 justify-center">
            <button (click)="editarProducto(p)"
              class="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-md transition">
              Editar
            </button>
            <button (click)="eliminarProducto(p.id!)"
              class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>
</div>

  `
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = this.nuevoProducto();
  editando = false;
  productoIdEditar?: number;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(data => this.productos = data);
  }

  guardarProducto() {
    if (this.editando) {
      this.productoService.actualizarProducto(this.productoIdEditar!, this.producto)
        .subscribe(() => {
          this.cargarProductos();
          this.cancelarEdicion();
        });
    } else {
      this.productoService.crearProducto(this.producto)
        .subscribe(() => {
          this.cargarProductos();
          this.producto = this.nuevoProducto();
        });
    }
  }

  editarProducto(p: Producto) {
    this.producto = { ...p };
    this.productoIdEditar = p.id;
    this.editando = true;
  }

  cancelarEdicion() {
    this.producto = this.nuevoProducto();
    this.editando = false;
    this.productoIdEditar = undefined;
  }

  eliminarProducto(id: number) {
    if (confirm('¿Seguro que quieres eliminar este producto?')) {
      this.productoService.eliminarProducto(id)
        .subscribe(() => this.cargarProductos());
    }
  }

  nuevoProducto(): Producto {
    return {
      nombre: '',
      marca: '',
      presentacion: '',
      precioVenta: 0,
      stock: 0
    };
  }
}
