import { Component } from '@angular/core';
import { Automovil } from '../automovil';
import { AutoService } from '../shared/auto.service';
import { ActivatedRoute } from '@angular/router';
import { AutoComponent } from '../auto/auto.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AutoComponent, AutoCompleteModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})


export class SearchComponent {
  nombreA: string = '';
  indice: number=0

  miAuto:Automovil={
    nombre:"",
    descrip:"",
    anio:0,
    img:"",
    marca:"",
    costo:0
  };

  constructor(private autoServicio: AutoService, private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(params=>{
      this.nombreA=params['nombreA'];
      this.indice=this.autoServicio.searchAuto(this.nombreA);
      console.log(this.indice);

      if(this.indice!=-1){
        this.miAuto=this.autoServicio.getAuto(this.indice); 
      }
    });
  }
}
