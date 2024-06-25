import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formInicio:FormGroup;

  constructor(private usuarioService:UsuariosService){
    this.formInicio = new FormGroup({
      correo: new FormControl(''),
      pass: new FormControl(''),
    });
  }

 onSubmit(){
    const resultado = true;
    if(resultado){
      Swal.fire({
        title: "Login exitoso",
        text: "Bienvenido al sistema",
        icon: "success"
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal, intenta de nuevo"
      });
    }
    this.formInicio.reset();
  }
}
