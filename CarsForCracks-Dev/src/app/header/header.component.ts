import { Component, Output, EventEmitter, output, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { OutputComponent } from '../output/output.component';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../usuarios.service';
import { CitasService } from '../citas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, OutputComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  
  fontSizeIncrement = 2;
  wordSpacingIncrement = 2;
  sesion:string|null = null;

  constructor(private router:Router, private renderer: Renderer2, private el: ElementRef, public citasService:CitasService){ }

  @Output() searchPerformed: EventEmitter<string> = new EventEmitter<string>();

  buscarAuto(auto:string){
    this.router.navigate(['/buscador',auto]);
    this.searchPerformed.emit();
  }

  
  // Apartado de sesiones
  isAuthenticated: boolean = false;



  ngOnInit(): void {
  
  }
  // Apartado de accesibilidad web
  
  fontSize: number = 16; // Tamaño inicial de la fuente
  wordSpacing: number = 0; // Espaciado inicial entre palabras
  isInverted: boolean = false; // Variable para rastrear el estado de color invertido

  @ViewChild('texto', { static: false }) texto!: ElementRef;  
  aux?:number;
  isSubmenuVisible: boolean = false;
  
  logout(){
    Swal.fire({
      title: "Estas seguro",
      text: "Se cerrara tu sesion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, mantener sesion",
      confirmButtonText: "Si, cerrar sesion"
    }).then((result) => {
      if (result.isConfirmed) {
        this.citasService.eliminarCookie();
      }
    });
  }
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
  
  // cerrarSesion(){
  //   this.usuariosService.cerrar();
  // }
  
  toggleInvertColors() {
    this.isInverted = !this.isInverted;
    if (this.isInverted) {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'filter', 'invert(1)');
    } else {
      this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body, 'filter');
    }
  }

  increaseFontSize(): void {
    const bodyElement = document.body;

    // Obtiene el tamaño actual de la fuente
    const currentFontSize = window.getComputedStyle(bodyElement).fontSize;
    const newFontSize = parseFloat(currentFontSize) + this.fontSizeIncrement + 'px';

    bodyElement.style.fontSize = newFontSize;
  }

  increaseWordSpacing(): void {
    const bodyElement = document.body;

    // Obtiene el espaciado actual de las palabras
    const currentWordSpacing = window.getComputedStyle(bodyElement).wordSpacing;
    const newWordSpacing = (parseFloat(currentWordSpacing) || 0) + this.wordSpacingIncrement + 'px';

    bodyElement.style.wordSpacing = newWordSpacing;
  }

  }


 

