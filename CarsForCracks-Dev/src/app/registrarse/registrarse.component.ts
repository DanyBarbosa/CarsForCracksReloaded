import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  formRegistro:FormGroup;

  
  constructor(private usuarioService:UsuariosService){
    this.formRegistro = new FormGroup({
      nombre: new FormControl(''),
      tel: new FormControl(''),
      correo: new FormControl(''),
      pass: new FormControl(''),
    });

  }
  
  

  onSubmit(){
    this.usuarioService.registro(this.formRegistro);
    this.formRegistro.reset();
  }
}
