import { Component, OnInit } from '@angular/core';
import { BehaviorService } from '../../../services/behavior.service';
import { OffersData } from '../../../models/offers.class';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserData } from '../../../models/user.class';
import { OffersService } from '../../../services/offers.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {

  offerData: OffersData;
  user: UserData;
  // Profile
  profile: any[] = [];
  userId: number;

  constructor(
    private behaviorService: BehaviorService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private offersService: OffersService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.behaviorService.offerData$.subscribe((data: OffersData) => {
      data?.id !== undefined ? this.offerData = data : this.router.navigate(['oferta']);
    });
    this.behaviorService.user$.subscribe((data: UserData) => {
      if (data?.token !== undefined) {
        this.user = data;
        this.userId = data.userId;
        if (data.rol === 'WORKER') {
          this.getProfile();
        }
      } else {
        this.user = null;
        this.userId = 0;
      }
    });
  }

  getProfile() {
    this.profileService.getProfile(this.userId).subscribe(
      (data) => {
        this.profile = data;
        if (data !== null) {
          this.behaviorService.sendProfileData(data);
        }
      }
    );
  }

  subscribe(offerId: number) {
    if (this.profile === null) {
      this._snackBar.open('Debe crear el perfil', 'X', {
        duration: 2000,
        verticalPosition: 'top'
      });
    } else {
      const obj = {
        offerId: offerId,
        userId: this.userId
      }
      this.offersService.subscribeOffer(obj).subscribe(
        () => this.router.navigate(['oferta'])
      );
    }
  }

  cancelSubscribeOffer(offerId: number) {
    const obj = {
      offerId: offerId,
      userId: this.userId
    }
    this.offersService.cancelSubscribeOffer(obj).subscribe(
      () => this.router.navigate(['oferta'])
    );
  }

  goOffers() {
    this.router.navigate(['oferta']);
  }

}
