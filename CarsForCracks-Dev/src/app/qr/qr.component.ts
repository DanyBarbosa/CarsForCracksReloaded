import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  qrData: string = '';

  constructor(private location: Location, private http: HttpClient) {
    const currentUrl = window.location.origin;
    this.generateQR(currentUrl);
  }

  generateQR(currentUrl: string) {
    this.http.get<{ number: number }>('http://localhost:3002/random-number')
      .subscribe(
        (response) => {
          const randomIndex = response.number;
          this.qrData = `${currentUrl}/registro/${randomIndex}`;
        },
        (error) => {
          console.error('no obtiene el numero', error);
        }
      );
  }
}