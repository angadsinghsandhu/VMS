import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

// Meta Data
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Logic
export class AppComponent implements OnInit {
  // Instantiating Service
  constructor(private authService: AuthService,
    private router: Router) { }

  level: string = null;
  loggedIn: boolean = false;

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
    this.level = this.authService.getUser()?.level;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
