import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  inventarioOpen = false;
  proveedoresOpen = false;

  toggleInventario() {
    this.inventarioOpen = !this.inventarioOpen;
  }

  toggleProveedores() {
    this.proveedoresOpen = !this.proveedoresOpen;
  }
}

