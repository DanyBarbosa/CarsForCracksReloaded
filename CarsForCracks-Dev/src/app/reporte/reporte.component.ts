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
  citasAdmin: Renta []=[];
  clientes: Renta[] = []
  clientesActivos: Renta[] = [];
  clientesInactivos: Renta[] = [];
  constructor(public citasService:CitasService, public usuariosService:UsuariosService) { }

  ngOnInit(){
    const clientes = this.usuariosService.buscar();
    console.log(this.citasService.obtenerCookie());
    console.log(this.usuariosService.buscar());
    this.mostrarCitas();
    this.mostrarCitasAdmin();
    console.log(this.mostrarCitas());
    
  }
  async mostrarCitasAdmin(): Promise<void> {
    try {
      this.citasAdmin = await this.usuariosService.tomarCitas();
      const today = new Date();
      this.clientesActivos = this.citasAdmin.filter(cliente => cliente.fechaFin > today);
      this.clientesInactivos = this.citasAdmin.filter(cliente => cliente.fechaFin <= today);
      console.log('Citas activas A:', this.clientesActivos);
      console.log('Citas inactivas A:', this.clientesInactivos);
    } catch (error) {
      console.error("Error al obtener los datos de las citas:", error);
    }
  }

  async mostrarCitas(): Promise<void> {
    try {
      this.clientes = await this.usuariosService.buscar();
      const today = new Date();
      this.clientesActivos = this.clientes.filter(cliente => cliente.fechaFin > today);
      this.clientesInactivos = this.clientes.filter(cliente => cliente.fechaFin <= today);
      console.log('Citas activas:', this.clientesActivos);
      console.log('Citas inactivas:', this.clientesInactivos);
    } catch (error) {
      console.error("Error al obtener los datos de las citas:", error);
    }
  }

}