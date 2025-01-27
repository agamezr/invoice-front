import { Component, Output, EventEmitter, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, JsonPipe],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css'
})
export class DatepickerComponent {
  	@Output() dateRange = new EventEmitter<{startDate: string; endDate: string}>()
  
	private startDate: string = '';
	private endDate: string = '';
	calendar = inject(NgbCalendar);
	hoveredDate: NgbDate | null = null;

	fromDate = new NgbDate(2022, 1,1)
	toDate: NgbDate | null = this.calendar.getNext(this.fromDate, 'd', 14);

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after	(this.fromDate)) {
			this.toDate = date;
      		this.emitDateRange();
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  private emitDateRange() {
    this.startDate = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
	  this.endDate = this.toDate ? this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day : '';
    this.dateRange.emit({ startDate: this.startDate, endDate: this.endDate });
  }
}
