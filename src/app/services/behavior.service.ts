import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../models/user.class';
import { OffersData } from '../models/offers.class';
import { contractTypeData } from '../models/contract-type.class';
import { workdayData } from '../models/workday.class';
import { professionalExpData } from '../models/professional-experience.class';
import { yearExpData } from '../models/year-experience.class';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  public user: BehaviorSubject<any> = new BehaviorSubject<any>({});
  user$ = this.user.asObservable();

  public offerData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  offerData$ = this.offerData.asObservable();

  public contractTypeData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  contractTypeData$ = this.contractTypeData.asObservable();

  public workdayData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  workdayData$ = this.workdayData.asObservable();

  public professionalExpData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  professionalExpData$ = this.professionalExpData.asObservable();  

  public yearExpData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  yearExpData$ = this.yearExpData.asObservable();

  public userProfileData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  userProfileData$ = this.userProfileData.asObservable();

  constructor() { }

  sendUser(user: UserData) {
    this.user.next(user);
  }

  sendOfferData(data: OffersData) {
    this.offerData.next(data);
  }

  sendContractType(data: contractTypeData[]) {
    this.contractTypeData.next(data);
  }

  sendWorkday(data: workdayData[]) {
    this.workdayData.next(data);
  }

  sendProfessionalExperience(data: professionalExpData[]) {
    this.professionalExpData.next(data);
  }
  
  sendYearsOfExperience(data: yearExpData[]) {
    this.yearExpData.next(data);
  }

  sendProfileData(data) {
    this.userProfileData.next(data);
  }
}
