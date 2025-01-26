import { Component, inject } from '@angular/core';
import { DatepickerComponent } from '../../../shared/features/datepicker/datepicker.component';
import { InvoicesStateService } from '../../services/invoices-state.service';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [DatepickerComponent],
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.css',
  providers: [InvoicesStateService]
})
export default class InvoicesListComponent {

  invoicesState = inject(InvoicesStateService)
  
  getDateRange(range: {startDate: string, endDate: string}){
    this.invoicesState.updateDateRange(range);
  }
}
