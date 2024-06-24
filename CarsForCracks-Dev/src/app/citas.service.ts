import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  

  setCookie(name: string, value: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000)); // 1 día
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
  }

  guardarCookie(correo: string): void {
    this.setCookie("correoUsuario", correo);
  }

  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

   obtenerCookie(): string | null {
    return this.getCookie("correoUsuario");
  }

   eraseCookie(name: string): void {
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
  }

   eliminarCookie(): void {
    this.eraseCookie("correoUsuario");
  }

}
