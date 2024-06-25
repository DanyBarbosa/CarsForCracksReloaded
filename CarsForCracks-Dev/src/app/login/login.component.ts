import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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

  constructor(private usuarioService: UsuariosService) {
    this.formInicio = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.minLength(10), this.contieneAroba]),
      pass: new FormControl('', [Validators.required])
    });
  }
  // Validacion personalizada para el campo de usuario
  // Solo es valido si tiene un @ dentro de la cadena

  contieneAroba(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value || value.indexOf('@') === -1) {
      return { noAroba: true };
    }
    return null;
  }

//  onSubmit(){
    
//   const resultado = true; // Siempre se activa la alerta sobre que se hizo el inicio de sesion exitoso 
//    this.usuarioService.iniciar(this.formInicio.value.correo, this.formInicio.value.pass);
//     if(resultado){
//       Swal.fire({
//         title: "Login exitoso",
//         text: "Bienvenido al sistema",
//         icon: "success"
//       });
//     }else{
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Algo salio mal, intenta de nuevo"
//       });
//     }
//     this.formInicio.reset();
//   }

onSubmit() {
  if (this.formInicio.invalid) {
    return;
  }

  const { correo, pass } = this.formInicio.value;

  this.usuarioService.iniciar(correo, pass)
    .then(() => {
      Swal.fire({
        title: "Login exitoso",
        text: "Bienvenido al sistema",
        icon: "success"
      });
      this.formInicio.reset();
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal, intenta de nuevo"
      });
    });
}

  get correo() { return this.formInicio.get('correo'); }
  get pass() { return this.formInicio.get('pass'); }
}
