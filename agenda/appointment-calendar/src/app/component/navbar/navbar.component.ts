import { Component, inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  authService = inject(AuthService);
  router = inject(Router);
  isAdmin = this.authService.isLocationAuthenticaded();

  logout(){
    this.router.navigate(['/']);
    this.authService.logout();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
