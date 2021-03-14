import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../models/dialog.class';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { OffersService } from '../../../services/offers.service';
import { contractTypeData } from '../../../models/contract-type.class';
import { workdayData } from '../../../models/workday.class';
import { professionalExpData } from '../../../models/professional-experience.class';
import { yearExpData } from '../../../models/year-experience.class';
import { BehaviorService } from '../../../services/behavior.service';
import { UserData } from '../../../models/user.class';
import { OfferData } from '../../../models/offer.class';

@Component({
  selector: 'offer-dialog',
  templateUrl: './offer-dialog.component.html',
  styleUrls: ['./offer-dialog.component.scss']
})
export class OfferDialogComponent implements OnInit {

  @Output() ofertEvent = new EventEmitter<any>(true);
  // FormControl
  id = new FormControl(0);
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  requirements = new FormControl('');
  min = new FormControl();
  max = new FormControl();
  location = new FormControl('', [Validators.required]);
  contractType = new FormControl(0, [Validators.required]);
  workday = new FormControl(0, [Validators.required]);
  experience = new FormControl(0, [Validators.required]);
  year = new FormControl(0, [Validators.required]);
  businessId = new FormControl(0, [Validators.required]);
  // List of select
  listContractType: contractTypeData[] = [];
  listWorkDay: workdayData[] = [];
  listExperience: professionalExpData[] = [];
  listYears: yearExpData[] = [];
  // Button
  disabledButton: boolean;
  userData: UserData;
  offerObject: OfferData = new OfferData();

  constructor(
    private behaviorService: BehaviorService,
    private offersService: OffersService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<OfferDialogComponent>
  ) { }

  ngOnInit(): void {
    this.disabledButton = true;
    this.behaviorService.user$.subscribe((data: UserData) => {
      data?.token !== undefined ? this.businessId.patchValue(data.business['id']) : this.businessId.patchValue(0);
      this.userData = data;
    });
    this.Select();

    if (this.data.checkInDialog) {
      this.id.patchValue(this.data.data['id']);
      this.title.patchValue(this.data.data['title']);
      this.description.patchValue(this.data.data['description']);
      this.requirements.patchValue(this.data.data['requirements']);
      this.min.patchValue(this.data.data['salaryAmountMin']);
      this.max.patchValue(this.data.data['salaryAmountMax']);
      this.location.patchValue(this.data.data['location']);
      this.contractType.patchValue(this.data.data['contractType']['id']);
      this.workday.patchValue(this.data.data['workday']['id']);
      this.experience.patchValue(this.data.data['requestedProfessionalExperience']['id']);
      this.year.patchValue(this.data.data['yearsOfExperience']['id']);
      this.checkInputs();
    }
  }

  Select() {
    this.behaviorService.contractTypeData$.subscribe((data: contractTypeData[]) => {
      this.listContractType = data
    });
    this.behaviorService.workdayData$.subscribe((data: workdayData[]) => {
      this.listWorkDay = data;
    });
    this.behaviorService.professionalExpData$.subscribe((data: professionalExpData[]) => {
      this.listExperience = data;
    });
    this.behaviorService.yearExpData$.subscribe((data: yearExpData[]) => {
      this.listYears = data;
    });
  }

  checkInputs() {
    if (this.title.valid && this.description.valid && this.location.valid && this.contractType.value !== 0  &&
      this.workday.value !== 0 && this.experience.value !== 0 && this.year.value !== 0) {
      this.disabledButton = false;
    } else {
      this.disabledButton = true;
    }
  }

  cleanInput(nameInput: string) {
    this[nameInput].patchValue(null);
    this.checkInputs();
  }

  cancelClick() {
    this.dialogRef.close();
  }

  selectChangeContract(event) {
    this.contractType.patchValue = event.value;
    this.checkInputs();
  }

  selectChangeWorday(event) {
    this.workday.patchValue = event.value;
    this.checkInputs();
  }

  selectChangeExperience(event) {
    this.experience.patchValue = event.value;
    this.checkInputs();
  }

  selectChangeYear(event) {
    this.year.patchValue = event.value;
    this.checkInputs();
  }

  aceptClick() {
    if (this.data.checkInDialog) {
      this.offerObject.id = this.id.value;
    }
    this.offerObject.title = this.title.value;
    this.offerObject.description = this.description.value;
    this.offerObject.requirements = this.requirements.value;
    this.offerObject.salaryAmountMin = this.min.value;
    this.offerObject.salaryAmountMax = this.max.value;
    this.offerObject.location = this.location.value;
    this.offerObject.contractTypeId = this.contractType.value;
    this.offerObject.workdayId = this.workday.value;
    this.offerObject.requestedProfessionalExperienceId = this.experience.value;
    this.offerObject.yearsOfExperienceId = this.year.value;
    this.offerObject.businessId = this.businessId.value;
    this.ofertEvent.emit();
  }

}
