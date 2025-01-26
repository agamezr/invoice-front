import { Component, inject } from '@angular/core';
import { DatepickerComponent } from '../../../shared/features/datepicker/datepicker.component';
import { InvoicesStateService } from '../../services/invoices-state.service';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [DatepickerComponent, FormsModule, NgbPaginationModule],
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.css',
  providers: [InvoicesStateService]
})
export default class InvoicesListComponent {

  invoicesState = inject(InvoicesStateService)
  
  getDateRange(range: {startDate: string, endDate: string}){
    this.invoicesState.updateDateRange(range);
  }

  changePage(page: number) {
    this.invoicesState.changePage$.next(page);
    this.invoicesState.state.getByPage(page);
  }

  changePerPage(EventEmitter: any) {
    const per_page = EventEmitter.target.value;
    this.invoicesState.changePerPage$.next(per_page);
    this.invoicesState.state.getByPerPage(per_page);
  }
}
