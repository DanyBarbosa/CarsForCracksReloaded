import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AutomovilComponent } from '../automovil/automovil.component';
import { AutoService } from '../shared/auto.service';
import { Automovil } from '../automovil';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Renta } from '../renta';
import { JsonPipe } from '@angular/common';
import { log } from 'console';
import { stringify } from 'querystring';
import { CalendarModule } from 'primeng/calendar';
import { CitasService } from '../citas.service';
import { FloatLabelModule } from "primeng/floatlabel";
import Swal from 'sweetalert2';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, JsonPipe, CalendarModule, FloatLabelModule],
  providers:[],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  automovil!:Automovil;
  enviado:boolean = false;
  datosCliente:Renta = {
    fecha: new Date(),
    fechaInicio: new Date(),
    fechaFin: new Date(),
    nombre: '',
    tel: '',
    correo: '',
    dias:0,
    auto: {
      nombre:'',
      descrip: '',
      anio: 0,
      img: '',
      marca: '',
      costo: 0,
    }
  }
  
  constructor(public automovilService: AutoService, public activatedRoute:ActivatedRoute, private citasService:CitasService){
    this.activatedRoute.params.subscribe(params => {
      this.automovil = automovilService.getAuto(params['id']);
    })
    
  }
  

  startDate: any;
  endDate: any;


  verificar():void{
    if(this.startDate != undefined && this.endDate != undefined){
      let prueba:number|undefined;
      prueba = this.calcularDiferenciaDias();
      if(this.datosCliente.nombre != null && this.datosCliente.correo != null && this.datosCliente.tel != null){
        this.datosCliente.auto = this.automovil;
        if(prueba !== undefined && this.enviado == true){
          let numero:number = prueba;
          this.datosCliente.dias = numero;
          this.datosCliente.fechaInicio = this.startDate;
          this.datosCliente.fechaFin = this.endDate;
          this.citasService.agregarRenta(this.datosCliente);
          this.datosCliente.nombre = '';
          this.datosCliente.tel = '';
          this.datosCliente.correo = '';
          this.startDate = null;
          this.endDate = null;
        }
      }
    }

  }

  submit():void{
    this.enviado = true;
    Swal.fire({
      title: 'Reserva Exitosa!',
      text: 'Puedes pasar por el auto el dia seleccionado.',
      icon:'success',
      confirmButtonText: 'Aceptar'
    });
    this.verificar();
  }

  calcularDiferenciaDias(): number | undefined {
    // Verificar si startDate y endDate no son undefined
    if (this.startDate === undefined || this.endDate === undefined || this.startDate.length === 0 || this.endDate.length === 0) {
        return undefined; // Devolver undefined si alguna de las fechas es undefined o los arreglos están vacíos
    }

    // Tomar la primera fecha de cada arreglo (asumiendo que solo necesitas la primera fecha)
    const fechaInicio = this.startDate;
    const fechaFin = this.endDate;

    // Calcular la diferencia en milisegundos
    const diferenciaMs = fechaFin.getTime() - fechaInicio.getTime();

    // Convertir la diferencia de milisegundos a días
    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

    return diferenciaDias;
}

}

