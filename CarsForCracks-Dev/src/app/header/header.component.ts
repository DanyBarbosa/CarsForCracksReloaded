import { Component, Output, EventEmitter, output } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { OutputComponent } from '../output/output.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, OutputComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router){ }
  @Output() searchPerformed: EventEmitter<string> = new EventEmitter<string>();

  buscarAuto(auto:string){
    this.router.navigate(['/buscador',auto]);
    this.searchPerformed.emit();
  }
}
