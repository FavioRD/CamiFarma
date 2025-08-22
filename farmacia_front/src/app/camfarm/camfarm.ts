import { Component } from '@angular/core';
import { Navbar } from '../Componentes/navbar/navbar';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-camfarm',
  imports: [Navbar],
  templateUrl: './camfarm.html',
})
export class Camfarm {
  totalProductos: number = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.totalProductos().subscribe((total) => {
      this.totalProductos = total;
    });
  }
}

