import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfileData } from '../models/profile.class';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private BASE_URL = environment.BASE_URL_USER;
  private GET_PROFILE = this.BASE_URL + environment.PROFILE;

  constructor(
    private http: HttpClient
  ) { }

  public getProfile(id: number): Observable<any> {
    return this.http.get<any[]>(this.GET_PROFILE.concat('/user/' + id));
  }

  public createProfile(obj: ProfileData): Observable<any> {
    return this.http.post<any>(this.GET_PROFILE, obj);
  }

  public editProfile(obj: ProfileData): Observable<any> {
    return this.http.put(this.GET_PROFILE.concat('/' + obj.id), obj);
  }
}
