import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedorService, Proveedor } from '../../proveedor.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [CommonModule, Navbar, FormsModule],
  templateUrl: './proveedor.html',
})
export class ProveedorComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedor: Proveedor = this.nuevoProveedor();
  editando = false;
  proveedorIdEditar?: number;

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedorService
      .getProveedores()
      .subscribe((data) => (this.proveedores = data));
  }

  guardarProveedor(form: any) {
    if (form.invalid) {
      return alert('Por favor completa todos los campos requeridos.');
    } else if (this.editando) {
      this.proveedorService
        .actualizarProveedor(this.proveedorIdEditar!, this.proveedor)
        .subscribe(() => {
          this.cargarProveedores();
          this.cancelarEdicion();
        });
    } else {
      this.proveedorService.crearProveedor(this.proveedor).subscribe(() => {
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
      this.proveedorService
        .eliminarProveedor(id)
        .subscribe(() => this.cargarProveedores());
    }
  }

  nuevoProveedor(): Proveedor {
    return {
      nombre: '',
      email: '',
      numero: '',
    };
  }

detallesProveedor: { medicamento: string; precioCompra: number }[] = [];
proveedorSeleccionado?: Proveedor;
mostrarModal = false;

verDetalles(p: Proveedor) {
  this.proveedorService.obtenerDetallesProveedor(p.id!).subscribe((data) => {
    this.detallesProveedor = data;
    this.proveedorSeleccionado = p;
    this.mostrarModal = true; // Abrir modal
  });
}

cerrarModal() {
  this.mostrarModal = false;
  this.detallesProveedor = [];
  this.proveedorSeleccionado = undefined;
}


}
