import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
  })
export class locationGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean{
     if(this.authService.isLocationAuthenticaded()){
      return true
    }
     this.router.navigate(['/commitent'])
     return false
  }

}
