import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AutomovilComponent } from './automovil/automovil.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistroComponent } from './registro/registro.component';
import { SearchComponent } from './search/search.component';
import { ReporteComponent } from './reporte/reporte.component';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'autos', component: AutomovilComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'registro/:id', component: RegistroComponent },
      { path: 'buscador/:nombreA', component: SearchComponent },
      { path: 'citas', component: ReporteComponent }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registrarse', component: RegistrarseComponent },
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
