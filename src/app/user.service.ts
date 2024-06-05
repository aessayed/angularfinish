import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  user?: User;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost/firstproject/src/index.php';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  checkUserExistence(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { email });
  }

  loginUser(email: string, password: string): Observable<LoginResponse> {
    const encodedEmail = encodeURIComponent(email.trim()); // Trim spaces from the email
    const url = `${
      this.apiUrl
    }?email=${encodedEmail}&password=${encodeURIComponent(password)}`;
    return this.http.get<LoginResponse>(url);
  }
}
