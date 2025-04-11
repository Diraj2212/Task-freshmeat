import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OnInit } from '@angular/core';


import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.html',
  styleUrls: ['./date-range.css'],
  providers: [DatePipe],
})
export class DateRangeComponent implements OnInit {
  datesArray: any;
  startDate!: Date;
  formatedStartDate: any;
  endDate!: Date;
  formatedEndDate: any;

  dates: any;
  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private service: OrderService,
    private matDiaolg: MatDialogRef<DateRangeComponent>
  ) {}
  ngOnInit(): void {}

  form: FormGroup = this.fb.group({
    dateRange: new FormGroup({
      start: new FormControl(''),
      end: new FormControl(''),
    }),
  });

  for() {
  

    this.startDate = this.form.get('dateRange.start')?.value;
    this.endDate = this.form.get('dateRange.end')?.value;

    this.datesArray = [this.startDate, this.endDate];

    this.matDiaolg.close(this.datesArray);
  }
}
