import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { LoginComponent } from './modals/login/login.component';
import { RegisterComponent } from './modals/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'team-tactics';

  loggedIn = false;

  constructor(private matDialog: MatDialog) {
  }

  openLoginDialog() {
    this.matDialog.open(LoginComponent)
  }

  openRegisterDialog() {
    this.matDialog.open(RegisterComponent)
  }
}
