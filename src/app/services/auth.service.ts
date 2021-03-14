import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserData } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.BASE_URL_USER;
  private GET_LOGIN = this.BASE_URL + environment.LOGIN;
  private GET_USER = this.BASE_URL + environment.USER;

  constructor(
    private http: HttpClient
  ) { }

  public getAccessToken(): string {
    return localStorage.getItem('token');
  }

  public user(data): Observable<any> {
    return this.http.post<UserData>(this.GET_USER, data);
  }

  public login(data): Observable<any> {
    return this.http.post<UserData>(this.GET_LOGIN, data);
  }
  
}
