import { Component, Output, EventEmitter, output, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { OutputComponent } from '../output/output.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, OutputComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit{

 
  constructor(private router:Router, private renderer: Renderer2, private el: ElementRef){ }

  @Output() searchPerformed: EventEmitter<string> = new EventEmitter<string>();

  buscarAuto(auto:string){
    this.router.navigate(['/buscador',auto]);
    this.searchPerformed.emit();
  }

  // Apartado de accesibilidad web
  
  fontSize: number = 16; // Tamaño inicial de la fuente
  wordSpacing: number = 0; // Espaciado inicial entre palabras
  isInverted: boolean = false; // Variable para rastrear el estado de color invertido

  @ViewChild('texto', { static: false }) texto!: ElementRef;  
  aux?:number;
  isSubmenuVisible: boolean = false;

  toggleSubmenu() {
    this.isSubmenuVisible = !this.isSubmenuVisible;
  }
  speak(): void {
    const synth = window.speechSynthesis;
    const selectedText = window.getSelection()?.toString();
  
    if (selectedText) {
      const utterance = new SpeechSynthesisUtterance(selectedText);
  
      // Establece el idioma de la voz
      utterance.lang = 'es-ES'; 
  
      synth.speak(utterance);
    } else {
      console.warn("No text is selected");
    }
  }
  
  
  toggleInvertColors() {
    this.isInverted = !this.isInverted;
    if (this.isInverted) {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'filter', 'invert(1)');
    } else {
      this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body, 'filter');
    }
  }

  ngAfterViewInit(): void {
    
  }
 
}
