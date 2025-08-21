import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, Producto } from '../producto.service';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './productos.html',
  
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = this.nuevoProducto();
  editando = false;
  productoIdEditar?: number;
  presentaciones: string[] = [
  'Tabletas / Comprimidos',
  'Cápsulas',
  'Jarabe',
  'Gotas',
  'Inyectable',
  'Crema / Pomada',
  'Suspensión',
  'Supositorio',
  'Inhalador'
];


  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(data => this.productos = data);
  }

  guardarProducto(form: any) {
    if(form.invalid){
      return alert('Por favor completa todos los campos requeridos.');
    }    
    else if (this.editando) {
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
      nombre:'',
      marca: '',
      presentacion: '',
      precioVenta: 0,
      stock: 0
    };
  }
}
