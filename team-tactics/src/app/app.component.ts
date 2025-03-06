import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { LoginComponent } from './modals/login/login.component';
import { RegisterComponent } from './modals/register/register.component';
import { AuthenticationService } from './services/authentication.service';

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

  loggedIn$ = this.authService.loggedIn$;

  constructor(private matDialog: MatDialog, private router: Router, private authService: AuthenticationService) {}

  openLoginDialog() {
    this.matDialog.open(LoginComponent)
  }

  openRegisterDialog() {
    this.matDialog.open(RegisterComponent)
  }

  navigateToHome() {
    this.router.navigateByUrl("");
  }

  navigateToCompetitions() {
    this.router.navigateByUrl("competitions");
  }

  navigateToProfile() {
    this.router.navigateByUrl("profile");
  }

  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl("");
  }
}
