import { Injectable } from '@angular/core';
import { Renta } from './renta';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  
  citas!:Renta[];

  constructor() { 
    this.citas = JSON.parse(localStorage.getItem("rentas")||'[]');
  }

  agregarRenta(cliente:Renta){
    this.citas.push(cliente);
    localStorage.setItem('rentas', JSON.stringify(this.citas));
  }

}
