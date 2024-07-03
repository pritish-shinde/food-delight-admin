import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Restaurant } from '../model/restaurant-model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http : HttpClient) { }

  url:string = "./assets/fdDb.json"

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      catchError(this.handleError))
  }
  
  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.url, restaurant).pipe(
      catchError(this.handleError)
    );
  }

  updateRestaurant(id:number, restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.url}/${restaurant.id}`, restaurant).pipe(
      catchError(this.handleError)
    );
  }
  getRestaurantById(id:string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }



  // Error Handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
