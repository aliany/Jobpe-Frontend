import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../components/commons/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialogRef: MatDialogRef<ModalComponent>;

  constructor(public dialog: MatDialog) { }

  show(): Observable<any> {
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: (Object.assign({})),
      disableClose: true
    });

    return this.dialogRef.afterClosed();
  }
}
