import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
  })
export class Autorizado implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean{
     if(this.authService.isAuthenticated()){
      return true
    }
     this.router.navigate(['/login'])
     return false
  }

}
