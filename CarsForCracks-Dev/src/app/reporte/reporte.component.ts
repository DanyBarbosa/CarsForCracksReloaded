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
  citasFuturas: Renta []=[];
  citasPasadas: Renta []=[];
  citasMarca: Renta []=[];

  clientes: Renta[] = [];
  clientesActivos: Renta[] = [];
  clientesInactivos: Renta[] = [];

  mostrarAll: boolean = true; 
  mostrarActuales: boolean = false; 
  mostrarPasadas: boolean = false;
  mostrarMarca: boolean = false; 
  
  constructor(public citasService:CitasService, public usuariosService:UsuariosService) { }

  ngOnInit(){
    const clientes = this.usuariosService.buscar();
    console.log(this.citasService.obtenerCookie());
    // console.log(this.usuariosService.buscar());
    this.mostrarCitas();
    this.mostrarCitasAdmin();
    this.tomarActuales();
    this.tomarPasadas();
    this.tomarMarca();
    // console.log(this.mostrarCitas());
    // console.log(this.tomarActuales());
    
    
  }
  async mostrarCitasAdmin(): Promise<void> {
    try {
      this.citasAdmin = await this.usuariosService.tomarCitas();
      const today = new Date();
      this.clientes = this.citasAdmin.map(cliente => {
        return {
          ...cliente,
          esActiva: cliente.fechaFin > today  // Añadimos una propiedad para marcar si es activa o no
        };
      });
      console.log('Todas las citas A:', this.clientes);
    } catch (error) {
      console.error("Error al obtener los datos de las citas:", error);
    }
  }
  async tomarActuales(): Promise<void> {
    try {
      this.citasFuturas = await this.usuariosService.futurasCitas();
      const today = new Date();
      this.clientes = this.citasFuturas.map(cliente => {
        return {
          ...cliente,
          esActiva: cliente.fechaFin > today  // Añadimos una propiedad para marcar si es activa o no
        };
      });
      console.log('Citas Futuras A:', this.clientes);
    } catch (error) {
      console.error("Error al obtener los datos de las citas:", error);
    }
  }

  async tomarPasadas(): Promise<void> {
    try {
      this.citasPasadas = await this.usuariosService.pasadasCitas();
      const today = new Date();
      this.clientes = this.citasPasadas.map(cliente => {
        return {
          ...cliente,
          esActiva: cliente.fechaFin > today  // Añadimos una propiedad para marcar si es activa o no
        };
      });
      console.log('Citas Pasadas A:', this.clientes);
    } catch (error) {
      console.error("Error al obtener los datos de las citas:", error);
    }
  }
  async tomarMarca(): Promise<void> {
    try {
      this.citasMarca = await this.usuariosService.citasMarca();
      const today = new Date();
      this.clientes = this.citasMarca.map(cliente => {
        return {
          ...cliente,
          esActiva: cliente.fechaFin > today  // Añadimos una propiedad para marcar si es activa o no
        };
      });
      console.log('Citas Marca A:', this.clientes);
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

  mostrarAllCitas(): void{
    this.mostrarAll = true;
    this.mostrarActuales= false;
    this.mostrarPasadas = false;
    this.mostrarMarca = false;
  }
  mostrarActualesCitas(): void {
    this.mostrarAll = false;
    this.mostrarActuales= true;
    this.mostrarPasadas = false;
    this.mostrarMarca = false;
  }

  mostrarPasadasCitas(): void {
    this.mostrarAll = false;
    this.mostrarActuales= false;
    this.mostrarPasadas = true;
    this.mostrarMarca = false;
  }
  mostrarMarcaCitas(): void{
    this.mostrarAll = false;
    this.mostrarActuales= false;
    this.mostrarPasadas = false;
    this.mostrarMarca = true;
  }
}