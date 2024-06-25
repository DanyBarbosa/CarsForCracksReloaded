import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  formRegistro: FormGroup;

  constructor(private usuarioService: UsuariosService) {
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

  onSubmit() {
    if (this.formRegistro.valid) {
      this.usuarioService.registro(this.formRegistro.value);
      this.formRegistro.reset();
    }
  }

  // Gets de los elementos del formulario

  get nombre() { return this.formRegistro.get('nombre');}
  get telefono() { return this.formRegistro.get('tel');}
  get correo() {return this.formRegistro.get('correo');}
 
}



