import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../producto.service';
import { FormsModule } from '@angular/forms';
import { VentasService, ProductoVentaDTO, VentaDTO } from '../../venta.service';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';

interface ItemVenta {
  id: number;
  nombre: string;
  marca: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  subtotal: number;
}

@Component({
  selector: 'app-ventas-form',
  templateUrl: './ventas.html',
  standalone: true,
  imports: [FormsModule, CommonModule, Navbar],
})
export class VentasFormComponent implements OnInit {
  productos: Producto[] = [];
  productosEnVenta: ItemVenta[] = [];
  productosCargados: boolean = false;

  // Para el historial de ventas
  ventas: any[] = [];
  ventasCargadas: boolean = false;

  productoSeleccionado: Producto | null = null;
  productoSeleccionadoId: number | null = null;
  cantidad: number = 1;
  precioUnitario: number = 0;
  descuento: number = 0;

  constructor(
    private productoService: ProductoService,
    private ventaService: VentasService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarVentas();
  }

  cargarProductos() {
    console.log('🔄 Cargando productos...');
    this.productoService.getProductos().subscribe((data) => {
      console.log('✅ Productos cargados:', data);
      console.log('Cantidad de productos:', data.length);
      this.productos = data;
      this.productosCargados = true;
      console.log('🚀 Productos marcados como cargados');
    });
  }

  cargarVentas() {
    console.log('🔄 Cargando historial de ventas...');
    this.ventaService.listarVentas().subscribe((data) => {
      console.log('✅ Ventas cargadas:', data);
      console.log('Cantidad de ventas:', data.length);
      this.ventas = data;
      this.ventasCargadas = true;
      console.log('🚀 Ventas marcadas como cargadas');
    });
  }

  agregarProducto(form: any) {
    console.log('🔍 Validando formulario...');
    console.log('form.valid:', form.valid);
    console.log('productoSeleccionado:', this.productoSeleccionado);
    console.log('cantidad:', this.cantidad);
    console.log('precioUnitario:', this.precioUnitario);

    if (
      form.valid &&
      this.productoSeleccionado &&
      this.cantidad > 0 &&
      this.precioUnitario > 0
    ) {
      console.log('✅ Formulario válido, creando item...');
      console.log('Producto seleccionado:', this.productoSeleccionado);
      console.log('Cantidad:', this.cantidad);
      console.log('Precio unitario:', this.precioUnitario);

      console.log('Datos del producto seleccionado:');
      console.log('- ID:', this.productoSeleccionado.id);
      console.log('- Nombre:', this.productoSeleccionado.nombre);
      console.log('- Marca:', this.productoSeleccionado.marca);
      console.log('- Precio Venta:', this.productoSeleccionado.precioVenta);

      const item: ItemVenta = {
        id: this.productoSeleccionado.id!,
        nombre: this.productoSeleccionado.nombre,
        marca: this.productoSeleccionado.marca,
        cantidad: this.cantidad,
        precioUnitario: this.precioUnitario,
        descuento: this.descuento,
        subtotal: this.calcularSubtotal(),
      };

      console.log('Item a agregar:', item);
      this.productosEnVenta.push(item);
      console.log('Productos en venta:', this.productosEnVenta);
      this.limpiarFormulario();
    } else {
      console.log('❌ Formulario inválido o datos faltantes');
      console.log('form.valid:', form.valid);
      console.log('productoSeleccionado:', this.productoSeleccionado);
      console.log('cantidad:', this.cantidad);
      console.log('precioUnitario:', this.precioUnitario);

      if (!this.productoSeleccionado) {
        console.log('⚠️ No hay producto seleccionado');
      }
      if (this.cantidad <= 0) {
        console.log('⚠️ Cantidad inválida');
      }
      if (this.precioUnitario <= 0) {
        console.log('⚠️ Precio unitario inválido');
      }
    }
  }

  calcularSubtotal(): number {
    return this.cantidad * this.precioUnitario;
  }

  calcularDescuento(): number {
    return (this.calcularSubtotal() * this.descuento) / 100;
  }

  calcularTotal(): number {
    return this.calcularSubtotal() - this.calcularDescuento();
  }

  calcularTotalVenta(): number {
    return this.productosEnVenta.reduce(
      (total, item) => total + item.subtotal,
      0
    );
  }

  calcularTotalGeneral(): number {
    return this.ventas.reduce((total, venta) => total + venta.total, 0);
  }

  limpiarFormulario() {
    this.productoSeleccionado = null;
    this.productoSeleccionadoId = null;
    this.cantidad = 1;
    this.precioUnitario = 0;
    this.descuento = 0;
  }

  editarItem(index: number) {
    const item = this.productosEnVenta[index];
    this.productoSeleccionado =
      this.productos.find((p) => p.id === item.id) || null;
    this.productoSeleccionadoId = item.id;
    this.cantidad = item.cantidad;
    this.precioUnitario = item.precioUnitario;
    this.descuento = item.descuento;
    this.eliminarItem(index);
  }

  eliminarItem(index: number) {
    this.productosEnVenta.splice(index, 1);
  }

  finalizarVenta() {
    if (this.productosEnVenta.length === 0) {
      alert('❌ No hay productos en la venta');
      return;
    }

    const venta: VentaDTO = {
      productos: this.productosEnVenta.map((item) => ({
        idProducto: item.id,
        cantidad: item.cantidad,
      })),
    };

    this.ventaService.registrarVenta(venta).subscribe((total) => {
      alert(`✅ Venta registrada con total: S/. ${total}`);
      this.productosEnVenta = [];
      this.limpiarFormulario();
      // Recargar el historial de ventas
      this.cargarVentas();
    });
  }

  cancelarVenta() {
    if (confirm('¿Estás seguro de que quieres cancelar la venta?')) {
      this.productosEnVenta = [];
      this.limpiarFormulario();
    }
  }

  onProductoChange() {
    console.log('onProductoChange ejecutado');
    if (this.productoSeleccionado) {
      console.log(
        'Producto seleccionado en change:',
        this.productoSeleccionado
      );
      console.log(
        'Tipo de productoSeleccionado:',
        typeof this.productoSeleccionado
      );
      console.log('Es objeto?', this.productoSeleccionado instanceof Object);
      console.log(
        'Propiedades disponibles:',
        Object.keys(this.productoSeleccionado)
      );

      this.precioUnitario = this.productoSeleccionado.precioVenta || 0;
      this.descuento = 0; // Reset descuento al cambiar producto
      console.log('Precio unitario actualizado:', this.precioUnitario);
    } else {
      console.log('No hay producto seleccionado');
    }
  }

  onProductoIdChange() {
    console.log(
      'onProductoIdChange ejecutado, ID:',
      this.productoSeleccionadoId
    );
    console.log('Tipo de ID:', typeof this.productoSeleccionadoId);
    console.log('Productos cargados:', this.productosCargados);
    console.log('Productos disponibles:', this.productos);
    console.log('Longitud de productos:', this.productos.length);

    if (!this.productosCargados) {
      console.log('⚠️ Los productos aún no se han cargado, esperando...');
      return;
    }

    if (this.productoSeleccionadoId) {
      // Convertir el ID a number para asegurar la comparación correcta
      const idBuscado = Number(this.productoSeleccionadoId);
      console.log('ID convertido a number:', idBuscado);

      const productoEncontrado = this.productos.find((p) => p.id === idBuscado);
      console.log('🔍 Búsqueda de producto:');
      console.log('- ID buscado:', idBuscado, 'tipo:', typeof idBuscado);
      console.log('- Producto encontrado:', productoEncontrado);
      if (productoEncontrado) {
        console.log(
          '- ID del producto encontrado:',
          productoEncontrado.id,
          'tipo:',
          typeof productoEncontrado.id
        );
        console.log(
          '- Comparación directa:',
          productoEncontrado.id === idBuscado
        );
        console.log(
          '- Comparación con ==:',
          productoEncontrado.id == idBuscado
        );
      }

      this.productoSeleccionado = productoEncontrado || null;

      if (this.productoSeleccionado) {
        console.log('✅ Producto encontrado:', this.productoSeleccionado);
        this.precioUnitario = this.productoSeleccionado.precioVenta || 0;
        this.descuento = 0;
        console.log('💰 Precio unitario actualizado:', this.precioUnitario);
      } else {
        console.log('❌ Producto NO encontrado con ID:', idBuscado);
        console.log(
          'IDs disponibles:',
          this.productos.map((p) => p.id)
        );
        console.log(
          'Tipos de IDs disponibles:',
          this.productos.map((p) => typeof p.id)
        );
      }
    }
  }

  verDetallesVenta(venta: any) {
    console.log('🔍 Ver detalles de venta:', venta);
    alert(
      `📊 Detalles de Venta #${venta.id}\n\nFecha: ${new Date(
        venta.fecha
      ).toLocaleString()}\nTotal: S/. ${venta.total.toFixed(2)}`
    );
  }
}
