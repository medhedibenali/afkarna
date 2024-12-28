import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth';

  constructor(
    private http: HttpClient
  ) { }

  public emailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/email-exists`, {
      params: { email }
    });
  }

  public userNameExists(userName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/username-exists`, {
      params: { userName }
    });
  }
}
