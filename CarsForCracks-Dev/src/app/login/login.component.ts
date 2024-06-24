import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { CommonModule } from '@angular/common';

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
    this.usuarioService.iniciar(this.formInicio.value.correo, this.formInicio.value.pass);
    this.formInicio.reset();
  }
}
