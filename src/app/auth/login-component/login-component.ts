import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [...SHARED_IMPORTS],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  private router = inject(Router);
  wrongCredentials: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Clear error when user starts typing
    this.loginForm.valueChanges.subscribe(() => {
      this.wrongCredentials = false;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (result) => this.router.navigate(['']),
        error: (error) => {
          this.wrongCredentials = true;
        },
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
