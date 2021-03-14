import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OffersData } from '../models/offers.class';
import { contractTypeData } from '../models/contract-type.class';
import { workdayData } from '../models/workday.class';
import { professionalExpData } from '../models/professional-experience.class';
import { yearExpData } from '../models/year-experience.class';
import { OfferData } from '../models/offer.class';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private BASE_URL = environment.BASE_URL;
  private GET_OFFERS = this.BASE_URL + environment.OFFERS;
  private GET_CONTRACT = this.BASE_URL + environment.CONTRACT;
  private GET_WORKDAY = this.BASE_URL + environment.WORKDAY;
  private GET_EXPERIENCE = this.BASE_URL + environment.EXPERIENCE;
  private GET_YEARS = this.BASE_URL + environment.YEARS;
  private GET_INSCRIPTION = this.BASE_URL + environment.INSCRIPTION;

  constructor(
    private http: HttpClient
  ) { }

  public getOffers(id?: number): Observable<any> {
    let params = new HttpParams();
    if (id !== undefined) {
      params = params.append('userId', id.toString());
    }
    return this.http.get<OffersData>(this.GET_OFFERS, { params });
  }

  public getContractType(): Observable<any> {
    return this.http.get<contractTypeData>(this.GET_CONTRACT);
  }

  public getWorkday(): Observable<any> {
    return this.http.get<workdayData>(this.GET_WORKDAY);
  }

  public getProfessionalExperience(): Observable<any> {
    return this.http.get<professionalExpData>(this.GET_EXPERIENCE);
  }

  public getYearsOfExperience(): Observable<any> {
    return this.http.get<yearExpData>(this.GET_YEARS);
  }

  public deleteOffer(id: number): Observable<any> {
    return this.http.delete(this.GET_OFFERS.concat('/' + id));
  }

  public desactivarOffer(id: number): Observable<any> {
    return this.http.post(this.GET_OFFERS.concat('/change-status/' + id), {});
  }

  public createOffer(obj: OfferData): Observable<any> {
    return this.http.post<any>(this.GET_OFFERS, obj);
  }

  public editOffer(obj: OfferData): Observable<any> {
    return this.http.put(this.GET_OFFERS.concat('/' + obj.id), obj);
  }

  public subscribeOffer(obj): Observable<any> {
    return this.http.post(this.GET_INSCRIPTION.concat('/enrolled'), obj);
  }

  public cancelSubscribeOffer(obj): Observable<any> {
    return this.http.post(this.GET_INSCRIPTION.concat('/unenrolled'), obj);
  }

}
