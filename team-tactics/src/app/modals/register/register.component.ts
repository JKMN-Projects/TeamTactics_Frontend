import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterUserRequest } from '../../interfaces/register';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]]
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (this.registerForm) {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = control.value;

      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm?.valid) {
      let register = {
        Username: this.registerForm.get("username")?.value,
        Email: this.registerForm.get("email")?.value,
        Password: this.registerForm.get("password")?.value
      } as RegisterUserRequest;

      this.registerService.registerUser(register);
    }
  }
}
