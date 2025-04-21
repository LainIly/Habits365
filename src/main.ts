import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from './app/app.routes'; // <<--- AGREGADO

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule),
    provideRouter(routes) // <<--- RUTAS ACTIVADAS AQUÍ
  ]
}).catch(err => console.error(err));
