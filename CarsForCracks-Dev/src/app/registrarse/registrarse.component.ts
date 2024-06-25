import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../usuarios.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  formRegistro: FormGroup;

  constructor(private usuarioService: UsuariosService, private route:Router) {
    this.formRegistro = new FormGroup({
      nombre: new FormControl('', Validators.required),
      tel: new FormControl('', [Validators.required, this.telefonoValidator, Validators.minLength(10)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPass: new FormControl('')
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('pass');
    const confirmPassword = form.get('confirmPass');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
  }

  telefonoValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const telefono = control.value;

    if (isNaN(Number(telefono))) {
      return { 'telefonoEsNumero': true };
    }

    return null;
  }

  async onSubmit() {
    console.log(this.formRegistro.value.correo);
    if (this.formRegistro.valid) {
      try {
        console.log(this.formRegistro.value.correo);
        console.log(this.formRegistro.value);
        await this.usuarioService.registro(this.formRegistro); // Esperar a que la promesa se resuelva
        Swal.fire({
          title: "Registro exitoso",
          text: "Usuario registrado correctamente",
          icon: "success"
        }).then(() => {
          this.route.navigate(['/home']); // Redirigir a la página de inicio
        });
        this.formRegistro.reset();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal, intenta de nuevo"
        });
      }
    }
  }

  // Gets de los elementos del formulario

  get nombre() { return this.formRegistro.get('nombre');}
  get telefono() { return this.formRegistro.get('tel');}
  get correo() {return this.formRegistro.get('correo');}
}



