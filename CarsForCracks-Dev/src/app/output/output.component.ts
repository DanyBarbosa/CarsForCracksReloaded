import { Component, Output, EventEmitter } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent {
  
}
