import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/env.dev';
import { userModel } from '../models/user.model'; 
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient){}

  login(username: any, password: any): Observable<userModel> {
     
      const params = new HttpParams()
        .set('username', username)
        .set('password', password);
        
      return this.http.get<userModel>(environment.API_URL, { params })
        .pipe(
          catchError(this.handleError)
        );
  }
  

  private handleError(error: HttpErrorResponse) {
    console.error(`Une erreur est survenue: ${error.status}, ${error.error}`);
    let errorMsg = 'Quelque chose a mal tourné. Veuillez réessayer plus tard.';

    if (error.status === 0) {
      errorMsg = 'Veuillez vérifier votre connexion Internet et réessayer.';
    } else if (error.status >= 400 && error.status < 500) {
      errorMsg = 'Identifiants invalides. Veuillez réessayer.';
    }

    return throwError(errorMsg);
  }
}
