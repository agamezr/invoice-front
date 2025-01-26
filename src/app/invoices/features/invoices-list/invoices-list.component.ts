import { Component } from '@angular/core';
import { DatepickerComponent } from '../../../shared/features/datepicker/datepicker.component';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [DatepickerComponent],
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.css'
})
export default class InvoicesListComponent {

  getDateRange(range: {startDate: string, endDate: string}){
    console.log(range)
  }
}
