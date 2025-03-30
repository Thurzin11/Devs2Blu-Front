import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorResponse } from '../../interface/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;
  authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(MatSnackBar) private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
          panelClass: ['success-snackbar']
        });
        const userRole = this.authService.getUserRole();
        this.redirectBasedOnRole(userRole);
        this.loading = false;
      },
      error: (err: ErrorResponse) => {
        this.loading = false;

        if (err.status === 401) {
          this.email?.setErrors({ invalidCredentials: true });
          this.password?.setErrors({ invalidCredentials: true });
          this.loginForm.markAllAsTouched();
        }
        this.snackBar.open(
          err.error?.message || 'Erro ao realizar login',
          'Fechar',
          { panelClass: ['error-snackbar'] }
        );
      }
    });
  }

  private redirectBasedOnRole(role: string) {
    switch (role) {
      case 'admin':
        this.router.navigate(['/commitent']);
        break;
      case 'user':
        this.router.navigate(['/commitent']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}
