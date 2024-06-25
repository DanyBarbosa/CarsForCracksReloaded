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
import { UsuariosService } from '../usuarios.service';
import { Usuarios } from '../usuarios';
import { HttpClient } from '@angular/common/http';




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
  usuario: Usuarios | null = null;
  datosCliente:Renta = {
    fecha: new Date(),
    fechaInicio: new Date(),
    fechaFin: new Date(),
    usuario: {
      nombre:'',
      tel:'',
      correo:'',
      pass:''
    },
    dias:0,
    auto: {
      nombre:'',
      descrip: '',
      anio: 0,
      img: '',
      marca: '',
      costo: 0,
    },
  }
  
  constructor(public automovilService: AutoService, public activatedRoute:ActivatedRoute, private citasService:CitasService, private usuarioService:UsuariosService, private http: HttpClient){
    this.activatedRoute.params.subscribe(params => {
      this.automovil = automovilService.getAuto(params['id']);
    })
    
  }
  

  startDate: any;
  endDate: any;


  async verificar(){
    if(this.startDate != undefined && this.endDate != undefined){
      let prueba:number|undefined;
      this.usuario = await this.usuarioService.cuenta();
      prueba = this.calcularDiferenciaDias();
      if(this.usuario != null){
        this.datosCliente.auto = this.automovil;
        if(prueba !== undefined && this.enviado == true){
          let numero:number = prueba;
          this.datosCliente.usuario = this.usuario;
          this.datosCliente.dias = numero;
          this.datosCliente.fechaInicio = this.startDate;
          this.datosCliente.fechaFin = this.endDate;

          this.http.post('http://localhost:3001/registro', { email: this.usuario.correo, datosCliente: this.datosCliente })
          .subscribe(
            response => {
              console.log('Respuesta del servidor:', response);
            },
            error => {
              console.error('Error al enviar los datos:', error);
            }
          );

          this.usuarioService.registroCita(this.datosCliente);
          // this.citasService.agregarRenta(this.datosCliente);
          this.usuarioService.buscar();
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

