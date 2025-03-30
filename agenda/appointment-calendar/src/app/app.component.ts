import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'appointment-calendar';
  mostrarNavbar = true;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(){
    this.router.events.subscribe(() => {
      this.mostrarNavbar = !['/', '/register'].includes(this.router.url);
    });
  }
}
