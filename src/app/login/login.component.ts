import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.loginUser(this.user).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.router.navigate(['/rolex']);
        } else {
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'cant login.';
      }
    );
  }
}
