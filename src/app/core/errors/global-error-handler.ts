import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../services/modal.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    public dialog: MatDialog,
    private modalService: ModalService) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('error.error', error.error);
    } else {
      console.log('error status', error, error.status);
    }
  }

}
