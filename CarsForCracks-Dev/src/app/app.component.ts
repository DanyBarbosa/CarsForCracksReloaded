import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AutomovilComponent } from './automovil/automovil.component';
import { FooterComponent } from './footer/footer.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { TablaComponent } from './tabla/tabla.component';
import Swal from 'sweetalert2';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RouterModule, ContactoComponent, HomeComponent, AutomovilComponent, FooterComponent, TablaComponent, LoginComponent, RegistrarseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CarsForCracks';
  onSearchPerformed(query: string) {
    Swal.fire({
      title: 'Busqueda realizada',
      text: 'Se ha completado con éxito tu busqueda, verifica que tu auto esté aquí',
      icon:'info',
      confirmButtonText: 'Aceptar'
    });
  }
}
