import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css'
})
export class QrComponent {
  constructor(private location: Location) {
    const currentUrl=window.location.origin;
    this.generateQR(currentUrl);
  }
  qrData: string = '';
  
  generateQR(currentUrl: String) {
      const randomIndex = Math.floor(Math.random() * 12);
      this.qrData = `${currentUrl}/registro/${randomIndex}`;
  }
}
