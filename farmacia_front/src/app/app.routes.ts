import { Routes } from '@angular/router';
import {ProveedorComponent} from './proveedor/proveedor';
import { HomeComponent } from './home/home';
import { Login } from './login/login';


export const routes: Routes = [
    { path: 'proveedores', component: ProveedorComponent },
    { path: 'productos', component: HomeComponent },
    {path: 'login', component:Login},
    { path: '', redirectTo: '', pathMatch: 'full' }
];
