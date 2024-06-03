import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  user: User = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  registerUser(): void {
    this.userService.registerUser(this.user).subscribe(
      (response) => {
        if (response.error) {
          this.errorMessage = response.error;
        } else if (response.id) {
          // Registration successful
          // Optionally, you can redirect to another page or display a success message
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    );
  }
}
