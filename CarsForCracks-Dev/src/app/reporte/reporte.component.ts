import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { Renta } from '../renta';
import { AutoService } from '../shared/auto.service';
import { CitasService } from '../citas.service';
import { Automovil } from '../automovil';
import { log } from 'console';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, JsonPipe, CalendarModule, CommonModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  hoy: Date = new Date();
  citas: Renta[] = [];

  constructor(private usuarioServicio:UsuariosService) { }

  

  cargarCitas(): void {
    const citasString = localStorage.getItem("rentas");
    if (citasString) {
      this.citas = JSON.parse(citasString);
    }
  }

  pasadas: Renta[] = [];
  proximas: Renta[] = [];
  orden(): void {
    this.citas.forEach(cita => {
      cita.fecha = new Date(cita.fecha);
      cita.fechaInicio = new Date(cita.fechaInicio);
      cita.fechaFin = new Date(cita.fechaFin);
      
      if (this.hoy.getTime() > cita.fechaInicio.getTime()) {
        this.pasadas.push(cita);
      } else {
        this.proximas.push(cita);
      }
    });
    
    console.log('Citas pasadas:', this.pasadas);
    console.log('Citas próximas:', this.proximas);
  }
}