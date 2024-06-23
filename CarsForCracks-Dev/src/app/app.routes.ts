import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AutomovilComponent } from './automovil/automovil.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistroComponent } from './registro/registro.component';
import { SearchComponent } from './search/search.component';
import { ReporteComponent } from './reporte/reporte.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"autos", component:AutomovilComponent},
    {path: "contacto" , component: ContactoComponent},
    {path: "registroUsr" , component: RegistrarseComponent},
    {path: "iniciarSesion" , component: LoginComponent},
    {path: "registro/:id", component: RegistroComponent},
    {path: 'buscador/:nombreA', component: SearchComponent},
    {path: "citas", component:ReporteComponent},
    {path: "**", pathMatch:"full" ,redirectTo:"home"},
];
