import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(), provideFirebaseApp(() => initializeApp({ "projectId": "carsforcracks", "appId": "1:112719744658:web:6c6789ae2803eedc1c604b", "storageBucket": "carsforcracks.appspot.com", "apiKey": "AIzaSyCuL3j1vc5oliijA8tLi1y7o1bOdgyIpAs", "authDomain": "carsforcracks.firebaseapp.com", "messagingSenderId": "112719744658", "measurementId": "G-PDZWY6TBWD" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })]
};
