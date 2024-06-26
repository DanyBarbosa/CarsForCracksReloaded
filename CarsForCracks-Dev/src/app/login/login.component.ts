import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxLoadingModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formInicioCorreo:FormGroup;
  formInicioTelefono:FormGroup;
  loading = false;
  metodoSeleccionado: string | null = null;

  constructor(private usuarioService: UsuariosService, private route:Router) {
    this.formInicioCorreo = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.minLength(10), this.contieneAroba]),
      pass: new FormControl('', [Validators.required])
    });

    this.formInicioTelefono = new FormGroup({
      // telefono: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      telefono: new FormControl
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

  seleccionarMetodo(metodo: string): void {
    this.metodoSeleccionado = metodo;
  }

//  onSubmit(){
    
//   const resultado = true; // Siempre se activa la alerta sobre que se hizo el inicio de sesion exitoso 
//    this.usuarioService.iniciar(this.formInicioCorreo.value.correo, this.formInicioCorreo.value.pass);
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
//     this.formInicioCorreo.reset();
//   }

onSubmitCorreo() {
  if (this.formInicioCorreo.invalid) {
    return;
  }

  this.loading = true;
  const { correo, pass } = this.formInicioCorreo.value;

  this.usuarioService.iniciar(correo, pass)
    .then(() => {
      setTimeout(() => {
        this.loading = false;
        Swal.fire({
          title: "Login exitoso",
          text: "Bienvenido al sistema",
          icon: "success"
        }).then(() => {
          this.route.navigate(['/home']); // Redirigir a la página de inicio
        });
        this.formInicioCorreo.reset();
      }, 3000); // simulando una operación de carga
    })
    .catch((error) => {
      setTimeout(() => {
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal, intenta de nuevo"
        });
      }, 3000); // simulando una operación de carga
    });
}

onSubmitTelefono(): void {
  if (this.formInicioTelefono.invalid) {
    return;
  }

  this.loading = true;
  const { telefono } = this.formInicioTelefono.value;
  // const telefonoStr = String("+52" + telefono);

  // console.log(telefonoStr);

  this.usuarioService.loginConTelefono({telefono})
    .then(() => {
      setTimeout(() => {
        this.loading = false;
        Swal.fire({
          title: "Login exitoso",
          text: "Bienvenido al sistema",
          icon: "success"
        }).then(() => {
          this.route.navigate(['/home']); // Redirigir a la página de inicio
        });
        this.formInicioTelefono.reset();
      }, 3000); // simulando una operación de carga
    })
    .catch((error) => {
      setTimeout(() => {
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal, intenta de nuevo"
        });
      }, 3000); // simulando una operación de carga
    });
}

  get correo() { return this.formInicioCorreo.get('correo'); }
  get pass() { return this.formInicioCorreo.get('pass'); }
}

