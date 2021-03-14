import { Component, OnInit } from '@angular/core';
import { OffersData } from '../../../models/offers.class';
import { OffersService } from '../../../services/offers.service';
import { BehaviorService } from '../../../services/behavior.service';
import { UserData } from '../../../models/user.class';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Constants } from '../../../constants/constants.component';
import { MatDialog } from '@angular/material/dialog';
import { OfferDialogComponent } from '../offer-dialog/offer-dialog.component';
import { contractTypeData } from '../../../models/contract-type.class';
import { workdayData } from '../../../models/workday.class';
import { professionalExpData } from '../../../models/professional-experience.class';
import { yearExpData } from '../../../models/year-experience.class';
import { ProfileService } from '../../../services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {

  dataOffers: OffersData[] = [];
  dataOffersAux: OffersData[] = [];
  rol: string;
  name = new FormControl('');
  typeSelect = new FormControl(1);
  filtersOffers = Constants.filtersOffers;
  userId: number;
  // List of select
  listContractType: contractTypeData[] = [];
  listWorkDay: workdayData[] = [];
  listExperience: professionalExpData[] = [];
  listYears: yearExpData[] = [];
  // Profile
  profile: any;

  constructor(
    private offersService: OffersService,
    private behaviorService: BehaviorService,
    private router: Router,
    public dialog: MatDialog,
    private profileService: ProfileService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.behaviorService.user$.subscribe((data: UserData) => {
      if (data?.token !== undefined) {
        this.rol = data.rol;
        this.userId = data.userId;
        this.Select();
        if (this.rol === 'WORKER') {
          this.getProfile();
        }
      } else {
        this.rol = '';
        this.userId = 0;
      }
      this.getOffers();
      this.behaviorService.userProfileData$.subscribe((data) => {
        if (data !== null) {
          this.profile = data;
        }
      });
    });

  }

  getProfile() {
    this.profileService.getProfile(this.userId).subscribe(
      (data) => {
        this.profile = data;
        if (data !== null) {
          this.behaviorService.sendProfileData(data);
        } else {
          this.behaviorService.sendProfileData(null);
        }
      }
    );
  }

  Select() {
    this.offersService.getContractType().subscribe(
      (data: contractTypeData[]) => this.behaviorService.sendContractType(data)
    );
    this.offersService.getWorkday().subscribe(
      (data: workdayData[]) => this.behaviorService.sendWorkday(data)
    );
    this.offersService.getProfessionalExperience().subscribe(
      (data: professionalExpData[]) => this.behaviorService.sendProfessionalExperience(data)
    );
    this.offersService.getYearsOfExperience().subscribe(
      (data: yearExpData[]) => this.behaviorService.sendYearsOfExperience(data)
    );
  }

  getOffers() {
    this.offersService.getOffers().subscribe(
      (data) => {
        this.dataOffers = data;
        this.dataOffersAux = [];
        if (this.rol === 'WORKER' || this.rol === '') {
          this.dataOffers = this.dataOffers.filter(element => element.status === 'OPENED');
        }
        this.dataOffersAux = [...this.dataOffers];
      }
    );
  }

  detailClick(data: OffersData) {
    this.behaviorService.sendOfferData(data);
    this.router.navigate(['oferta/detalle']);
  }

  subscribeOffer(offerId: number) {
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
        () => this.getOffers()
      );
    }
  }

  cancelSubscribeOffer(offerId: number) {
    const obj = {
      offerId: offerId,
      userId: this.userId
    }
    this.offersService.cancelSubscribeOffer(obj).subscribe(
      () => this.getOffers()
    );
  }

  changeType(id: number) {
    this.typeSelect.patchValue(id);
  }

  cleanSearch() {
    this.name.patchValue('');
    this.typeSelect.patchValue(1);
    this.dataOffersAux = [...this.dataOffers];
  }

  filterSearch() {
    this.dataOffersAux = this.dataOffers.filter(element => {
      const title = element.title.toLowerCase();
      if (this.typeSelect.value === 1) {
        return title.includes(this.name.value.toLowerCase());
      } else if (this.typeSelect.value === 2) {
        return title.includes(this.name.value.toLowerCase()) && element.subscribed === true;
      }
    });
  }

  editOffers(data, newOffers: boolean) {
    let title: string;
    if (data === null) {
      title = 'Adicionar Oferta';
    } else {
      title = 'Editar Oferta';
    }
    const dialogRef = this.dialog.open(OfferDialogComponent, {
      width: '800px',
      data: {
        title: title,
        checkInDialog: newOffers,
        data: (Object.assign({}, data)),
      },
      disableClose: true
    });

    dialogRef.componentInstance.ofertEvent.subscribe(() => {
      dialogRef.close();
      newOffers ? this.editOffer(dialogRef) : this.addNewOffer(dialogRef);
    });
  }

  addNewOffer(dialogRef) {
    this.offersService.createOffer(dialogRef.componentInstance.offerObject).subscribe(
      () => this.getOffers()
    );
  }

  editOffer(dialogRef) {
    this.offersService.editOffer(dialogRef.componentInstance.offerObject).subscribe(
      () => this.getOffers()
    );
  }

  deleteOffer(id: number) {
    this.offersService.deleteOffer(id).subscribe(
      () => this.getOffers()
    );
  }

  desactivarOffer(id: number) {
    this.offersService.desactivarOffer(id).subscribe(
      () => this.getOffers()
    );
  }

}
