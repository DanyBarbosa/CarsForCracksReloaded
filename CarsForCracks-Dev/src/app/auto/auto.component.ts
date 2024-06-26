import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Automovil } from '../automovil';
import { AutoService } from '../shared/auto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auto',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './auto.component.html',
  styleUrl: './auto.component.css'
})
export class AutoComponent {
  @Input() indice!:number;
  @Input() auto!:Automovil;
  constructor(public autoServicio:AutoService, public activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(params => {
      this.indice=autoServicio.searchAuto(params['id']);
      this.auto=autoServicio.getAuto(params['id']);
    });
  }
}
