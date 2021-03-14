import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {


  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
