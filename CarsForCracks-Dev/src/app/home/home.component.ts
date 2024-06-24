import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { AutomovilComponent } from '../automovil/automovil.component';
import { TablaComponent } from '../tabla/tabla.component';
import { DomseguroPipe } from '../domseguro.pipe';
import { UsuariosService } from '../usuarios.service';
import { QrComponent } from '../qr/qr.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, QrComponent, CardComponent, CarouselComponent, AutomovilComponent,TablaComponent, DomseguroPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tarjetas = [
    {
      titulo: 'Misión',
      descripcion: 'Ofrecer a nuestros clientes una experiencia de alquiler de autos conveniente, segura y sin complicaciones, brindando una amplia gama de vehículos de calidad y un servicio excepcional que satisfaga y supere sus expectativas.',
      imagen: 'assets/img/mision.jpg',
    },
    {
      titulo: 'Visión',
      descripcion: 'Convertirnos en el proveedor líder de alquiler de autos a nivel regional, reconocido por nuestra excelencia en servicio al cliente, innovación tecnológica y compromiso con la sostenibilidad ambiental.',
      imagen: 'assets/img/vision.webp',
    },
    {
      titulo: 'Objetivo',
      descripcion: 'Proporcionar a nuestros clientes una solución integral para sus necesidades de transporte, ofreciendo una flota diversa de vehículos bien mantenidos, precios competitivos, procesos de reserva sencillos y una atención al cliente excepcional, con el fin de ser la opción preferida para el alquiler de autos en nuestra área de operaciones.',
      imagen: "assets/img/objetivo.jpg",
    }
  ];


  video:string="Oil-uwcxzBk?si=RfEiYHhDbtEQYZnB";
  constructor() { }
}
