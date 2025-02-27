import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]]
    });
  }

  ngOnInit(): void {
  }

  // Custom validator for password confirmation
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (this.registerForm) {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = control.value;
      if (password !== confirmPassword) {
        return { passwordMismatch: true };
      }
    }
    return null;  // return null if the passwords match
  }

  // Handle form submission
  onSubmit(): void {
    if (this.registerForm?.valid) {
      const { username, email, password } = this.registerForm.value;
      console.log('Registration successful', { username, email, password });
    }
  }
}
