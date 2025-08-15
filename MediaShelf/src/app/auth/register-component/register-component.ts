import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../core/auth';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  imports: [...SHARED_IMPORTS],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [Validators.required, this.confirmPasswordValidator.bind(this)],
      ],
    });
  }

  confirmPasswordValidator(control: AbstractControl) {
    if (!control.value) return null;

    const password = this.registerForm?.get('password')?.value;
    return password === control.value ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authService.register(email, password).subscribe({
        next: (result) => this.router.navigate(['']),
        error: (error) => console.error('Registration failed', error),
      });
    }
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
