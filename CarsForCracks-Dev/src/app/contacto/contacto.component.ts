import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CheckboxModule } from 'primeng/checkbox';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RatingModule, FormsModule, CommonModule, CheckboxModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  name: string = '';
  email: string = '';
  subject1: string = '';
  message1: string = '';

  form: FormGroup;
  constructor(private http: HttpClient){
    this.form = new FormGroup({
      senderName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      senderEmail: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required, Validators.minLength(10)]),
      satisfecho: new FormControl(false),
      contento: new FormControl(false),
      descontento: new FormControl(false),
      desagradable: new FormControl(false)
    });
  }

  value!:number;

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      this.http.post('http://localhost:3000/send-email', formData)
        .subscribe(response => {
          console.log('Correo enviado', response);
        }, error => {
          console.log('Error al enviar el correo', error);
        });
        Swal.fire({
          title: 'Gracias!',
          text: 'Gracias por tu comentario. Te responderemos a la brevedad.',
          icon:'success',
          confirmButtonText: 'Aceptar'
        });
    } else {
      alert("Por favor, complete el formulario correctamente.");
    }
  }
  principal={
    'width.px': '100%',
    'margin': 'auto',
    'padding-top': '100px',
    color: 'rgb(255, 255, 255)',
    'font-weight': 'bold',
    'padding-left': '50%',
    'padding-right': '10%',
    'padding-bottom': '100px',
    'text-align': 'center',
    'font-size': '20px',
    'background-image': 'url(../../assets/img/fondoContact.jpg)',
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'background-size': 'cover',
}
imagen={
  'position': 'absolute', 
  'top': '200px',
  'left': '400px',
  'height': 'auto',
}
formulario={
  'position': 'relative',
  'width': '100%',
  'margin': 'auto',
  'padding-top': '100px',
  'padding-bottom': '100px',
  'padding-left': '20%',
  'padding-right': '20%',
  'font-size': '55px',
  'color': 'rgb(0, 0, 0)',
  'font-weight': 'bold',
  'background-color': 'lightgray',
}

imgPerf={
  'width': '200px',
  'height': '200px',
}
nosotros={
  'padding-top': '30px',
  'align-items': 'center',
  display: 'flex',
  'flex-wrap': 'wrap',
  'justify-content': 'center',
}
h5={
  'padding-top': '30px',
}
titulo={
  'margin': 'auto',
  'text-align': 'center',
  'padding-top': '100px',
  'width': '70%',
  'font-size': '30px',
}
persona={
  'padding-bottom': '50px',
  'margin-right': '50px', 
  'margin-bottom': '50px',
  'text-align': 'center', 
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
}
Satisfecho: boolean = false;
Contento: boolean = false;
Descontento: boolean = false;
Desagradable: boolean = false;
}

