import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorService } from '../../../services/behavior.service';
import { professionalExpData } from '../../../models/professional-experience.class';
import { yearExpData } from '../../../models/year-experience.class';
import { ProfileData } from '../../../models/profile.class';
import { ProfileService } from '../../../services/profile.service';
import { UserData } from '../../../models/user.class';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // FormControl
  id = new FormControl(0);
  name = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  address = new FormControl('');
  date = new FormControl('', [Validators.required]);
  cod = new FormControl('');
  tel = new FormControl('', [Validators.required]);
  presentation = new FormControl('');
  experience = new FormControl(0, [Validators.required]);
  year = new FormControl(0, [Validators.required]);
  userId = new FormControl(0, [Validators.required]);
  // Button
  disabledButton: boolean;
  // List
  listExperience: professionalExpData[] = [];
  listYears: yearExpData[] = [];
  profileData: ProfileData = new ProfileData();

  constructor(
    private behaviorService: BehaviorService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.behaviorService.user$.subscribe((data: UserData) => {
      data?.token !== undefined ? this.userId.patchValue(data.userId) : this.userId.patchValue(0);
    });
    this.Select();
    this.getProfile();
  }

  getProfile() {
    this.behaviorService.userProfileData$.subscribe((data) => {
      if (data !== null) {
        this.id.patchValue(data['id']);
        this.name.patchValue(data['name']);
        this.lastName.patchValue(data['lastName']);
        this.address.patchValue(data['address']);
        this.date.patchValue(data['birthdate']);
        this.cod.patchValue(data['postalCode']);
        this.tel.patchValue(data['phoneNumber']);
        this.presentation.patchValue(data['presentationText']);
        this.experience.patchValue(data['requestedProfessionalExperienceId']);
        this.year.patchValue(data['yearsOfExperienceId']);
        this.checkInputs();
      }
    });
  }

  Select() {
    this.behaviorService.professionalExpData$.subscribe((data: professionalExpData[]) => {
      this.listExperience = data;
    });
    this.behaviorService.yearExpData$.subscribe((data: yearExpData[]) => {
      this.listYears = data;
    });
  }

  checkInputs() {
    if (this.name.valid && this.lastName.valid && this.tel.valid
      && this.experience.value !== 0 && this.year.value !== 0) {
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

  selectChangeExperience(event) {
    this.experience.patchValue = event.value;
    this.checkInputs();
  }

  selectChangeYear(event) {
    this.year.patchValue = event.value;
    this.checkInputs();
  }

  aceptClick() {
    this.profileData.id = this.id.value;
    this.profileData.name = this.name.value;
    this.profileData.lastName = this.lastName.value;
    this.profileData.address = this.address.value;
    this.profileData.birthdate = this.date.value;
    this.profileData.postalCode = this.cod.value;
    this.profileData.phoneNumber = this.tel.value;
    this.profileData.presentationText = this.presentation.value;
    this.profileData.requestedProfessionalExperienceId = this.experience.value;
    this.profileData.yearsOfExperienceId = this.year.value;
    this.profileData.userId = this.userId.value;
    if (this.id.value === 0) {
      this.profileService.createProfile(this.profileData).subscribe(
        () => {
          this.getProfileService();
          this.cancelClick();
        }
      );
    } else {
      this.profileService.editProfile(this.profileData).subscribe(
        () => {
          this.getProfileService();
          this.cancelClick();
        }
      );
    }
  }

  getProfileService() {
    this.profileService.getProfile(this.profileData.userId).subscribe(
      (data) => {
        this.behaviorService.sendProfileData(data);
      }
    );
  }

}
