import { Component } from '@angular/core';
import { Automovil } from '../automovil';
import { AutoService } from '../shared/auto.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-automovil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './automovil.component.html',
  styleUrl: './automovil.component.css'
})
export class AutomovilComponent {
  automoviles : Automovil[]=[];
  constructor(public miservicio: AutoService){ }

  ngOnInit() : void{
    this.automoviles = this.miservicio.getAutos();
  }
}