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

  loginUser(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, user);
  }
}
