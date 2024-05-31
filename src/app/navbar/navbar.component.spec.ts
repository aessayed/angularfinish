import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = false;
  isAdmin = false;
  isSuperAdmin = false;

  constructor(private router: Router) {
    // Mock session data
    const session = {
      isLoggedIn: true,
      isAdmin: true,
      isSuperAdmin: true,
    };

    this.isLoggedIn = session.isLoggedIn;
    this.isAdmin = session.isAdmin;
    this.isSuperAdmin = session.isSuperAdmin;
  }

  // openNav() {
  //   document.getElementById('mySidenav').style.width = '100%';
  // }

  // closeNav() {
  //   document.getElementById('mySidenav').style.width = '0';
  // }
}
