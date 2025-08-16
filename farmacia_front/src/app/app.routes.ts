import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import {ProveedorComponent} from './proveedor/proveedor';

export const routes: Routes = [
    { path: 'productos', component: HomeComponent },
    { path: 'proveedores', component: ProveedorComponent },
    { path: '', redirectTo: 'productos', pathMatch: 'full' }
];
