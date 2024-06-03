import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost/firstproject/src/cart.php'; // Adjust the URL to your server path

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  fetchCart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?action=fetch`)
      .pipe(catchError(this.handleError));
  }

  addToCart(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { action: 'add', ...item })
      .pipe(catchError(this.handleError));
  }

  updateCart(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { action: 'update', ...item })
      .pipe(catchError(this.handleError));
  }

  removeFromCart(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?action=remove&id=${id}`)
      .pipe(catchError(this.handleError));
  }

  deleteAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?action=delete_all`)
      .pipe(catchError(this.handleError));
  }

  checkout(): Observable<any> {
    return this.http.post<any>(this.apiUrl, { action: 'checkout' })
      .pipe(catchError(this.handleError));
  }
}
