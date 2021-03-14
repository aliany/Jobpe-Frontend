import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, Form } from '@angular/forms';
import { Constants } from '../../../constants/constants.component';
import { LoginData } from '../../../models/login.class';
import { DialogData } from '../../../models/dialog.class';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginEvent = new EventEmitter<any>(true);
  typeList = Constants.typeList;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  type = new FormControl(0, [Validators.required]);
  name = new FormControl('', [Validators.required]);
  disabledButton: boolean;
  loginObject: LoginData = new LoginData();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit(): void {
    this.disabledButton = true;
  }

  cancelClick() {
    this.dialogRef.close();
  }

  aceptClick() {
    this.loginObject.username = this.email.value;
    this.loginObject.password = this.password.value;
    if (this.type.value === 1) {
      this.loginObject.rol = 'WORKER';
    } else {
      this.loginObject.rol = 'BUSINESS';
      this.loginObject.name = this.name.value;
    }
    this.loginEvent.emit();
  }

  cleanInput(nameInput: string) {
    this[nameInput].patchValue(null);
    this.checkInputs();
  }

  checkInputs() {
    let control: boolean = true;
    if (this.data.checkInDialog) {
      if (this.email.valid && this.password.valid && (this.type.value !== 0)) {
        (this.type.value === 2 && this.name.value !== '') || this.type.value === 1 ? control = false : control = true;
      }
    } else {
      if (this.email.valid && this.password.valid) {
        control = false;
      }
    }
    !control ? this.disabledButton = false : this.disabledButton = true;
  }

  changeType(id: number) {
    id === 1 ? this.type.patchValue('') : '';
    this.type.patchValue(id);
    this.checkInputs();
  }

}
