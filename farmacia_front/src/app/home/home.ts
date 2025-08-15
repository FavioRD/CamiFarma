import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, Producto } from '../producto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    
      <h2 class="text-2xl font-bold text-center mb-6">Inventario de Medicamentos</h2>
      <div class="flex justify-evenly">
        <!-- Formulario -->
        <form (ngSubmit)="guardarProducto()" class="w-full max-w-lg  bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 class="text-xl font-bold mb-4">Agregar Producto</h2>
          <input [(ngModel)]="producto.nombre" name="nombre" placeholder="Nombre" required
            class="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input [(ngModel)]="producto.marca" name="marca" placeholder="Marca" required
            class="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input [(ngModel)]="producto.presentacion" name="presentacion" placeholder="Presentación" required
            class="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input [(ngModel)]="producto.precioVenta" name="precioVenta" type="number" placeholder="Precio" required
            class="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input [(ngModel)]="producto.stock" name="stock" type="number" placeholder="Stock" required
            class="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
  
          <div class="flex gap-2 col-span-full">
            <button type="submit"
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition">
              {{ editando ? 'Actualizar' : 'Agregar' }}
            </button>
            <button type="button" (click)="cancelarEdicion()" *ngIf="editando"
              class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition">
              Cancelar
            </button>
          </div>
        </form>
  
        <!-- Tabla -->
        <div class="overflow-x-auto bg-white rounded-lg shadow-md ">
          <table class="min-w-full text-left border-collapse">
            <thead class="bg-blue-500 text-white">
              <tr>
                <th class="py-2 px-4">ID</th>
                <th class="py-2 px-4">Nombre</th>
                <th class="py-2 px-4">Marca</th>
                <th class="py-2 px-4">Presentación</th>
                <th class="py-2 px-4">Precio Venta</th>
                <th class="py-2 px-4">Stock</th>
                <th class="py-2 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of productos" class="border-b hover:bg-gray-100 transition">
                <td class="py-2 px-4">{{ p.id }}</td>
                <td class="py-2 px-4">{{ p.nombre }}</td>
                <td class="py-2 px-4">{{ p.marca }}</td>
                <td class="py-2 px-4">{{ p.presentacion }}</td>
                <td class="py-2 px-4">S/.{{ p.precioVenta}}</td>
                <td class="py-2 px-4">{{ p.stock }}</td>
                <td class="py-2 px-4 flex gap-2">
                  <button (click)="editarProducto(p)"
                    class="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition">
                    Editar
                  </button>
                  <button (click)="eliminarProducto(p.id!)"
                    class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
