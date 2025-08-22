import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorComponent } from './Componentes/proveedor/proveedor';
import { HomeComponent } from './Componentes/productos/productos';
import { LoginComponent } from './Componentes/login/login.component';
import { Camfarm } from './camfarm/camfarm';

export const routes: Routes = [
  { path: 'proveedores', component: ProveedorComponent },
  { path: 'productos', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'camfarm', component: Camfarm },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
