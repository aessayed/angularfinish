import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  
  user = { name: '', email: ''};

  constructor(private userService: UserService) { }

  addUser(): void {
    this.userService.addUser(this.user).subscribe(() => {
      this.user = { name: '', email: ''};
    });
  }
}