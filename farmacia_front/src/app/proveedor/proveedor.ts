import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedorService, Proveedor } from '../proveedor.service';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <h2 class="text-2xl font-bold mb-4 text-center">Proveedores</h2>
<div class="flex justify-evenly">
    <form (ngSubmit)="guardarProveedor()" 
          class="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-4 mb-6">

      <input [(ngModel)]="proveedor.nombre" name="nombre" placeholder="Nombre" required
        class="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500">

      <input [(ngModel)]="proveedor.email" name="email" placeholder="Email" required
        class="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500">

      <input [(ngModel)]="proveedor.numero" name="numero" placeholder="Telefono" required
        class="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500">

      <div class="flex gap-2">
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
    <div class="overflow-x-auto">
      <table class="table-auto border-collapse border border-gray-300 w-full text-left shadow-md">
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-2">ID</th>
            <th class="border p-2">Nombre</th>
            <th class="border p-2">Email</th>
            <th class="border p-2">Numero</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of proveedores" class="hover:bg-gray-50">
            <td class="border p-2">{{ p.id }}</td>
            <td class="border p-2">{{ p.nombre }}</td>
            <td class="border p-2">{{ p.email }}</td>
            <td class="border p-2">{{ p.numero }}</td>
            <td class="border p-2 space-x-2">
              <button (click)="editarProveedor(p)"
                class="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">Editar</button>
              <button (click)="eliminarProveedor(p.id!)"
                class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
  `
})
export class ProveedorComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedor:Proveedor = this.nuevoProveedor();
  editando=false;
  proveedorIdEditar?:number;

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(){
      this.cargarProveedores();
  }

  cargarProveedores(){
    this.proveedorService.getProveedores()
      .subscribe(data => this.proveedores = data);
  }

  guardarProveedor() {
    if (this.editando) {
      this.proveedorService.actualizarProveedor(this.proveedorIdEditar!, this.proveedor)
        .subscribe(() => {
          this.cargarProveedores();
          this.cancelarEdicion();
        });
    } else {
      this.proveedorService.crearProveedor(this.proveedor)
        .subscribe(() => {
          this.cargarProveedores();
          this.proveedor = this.nuevoProveedor();
        });
    }
  }

  editarProveedor(p: Proveedor) {
    this.proveedor = { ...p };
    this.proveedorIdEditar = p.id;
    this.editando = true;
  }

  cancelarEdicion() {
    this.proveedor = this.nuevoProveedor();
    this.editando = false;
    this.proveedorIdEditar = undefined;
  }

  eliminarProveedor(id: number) {
    if (confirm('¿Seguro que quieres eliminar este proveedor?')) {
      this.proveedorService.eliminarProveedor(id)
        .subscribe(() => this.cargarProveedores());
    }
  }

  nuevoProveedor(): Proveedor {
    return {
      nombre: '',
      email: '',
      numero: ''
    };
  }
}