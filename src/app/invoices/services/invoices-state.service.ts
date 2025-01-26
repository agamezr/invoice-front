import { inject, Injectable } from "@angular/core";
import { InvoicesService } from "./invoices.service";
import { Invoice } from "../../shared/interfaces/invoice.interface";
import { signalSlice } from 'ngxtension/signal-slice';
import { switchMap,map, catchError, BehaviorSubject, startWith } from "rxjs";


interface State {
    invoices: Invoice[];
    status: 'loading' | 'success' | 'error';
    total_pages: number;
    total_data: number;
    page: number;
    per_page: number;
}

@Injectable()
export class InvoicesStateService{
    private invoicesService = inject(InvoicesService)

    private initialState: State = {
        invoices: [],
        status: 'loading',
        total_pages: 1,
        total_data: 1,
        page: 1,
        per_page: 1
    }

    private dateRange$ = new BehaviorSubject<{ startDate: string; endDate: string }>({
        startDate: "2022-01-01",
        endDate: "2022-12-31",
    })

    private fetchInvoices(dateRange: { startDate: string; endDate: string }, page: number, perPage: number) {
        return this.invoicesService.getInvoices({ ...dateRange }, page, perPage).pipe(
            map(({ invoices }) => ({
                invoices,
                status: 'success' as const,

            })),
            catchError(() => [{ invoices: [], status: 'error' as const }])
        );
    }

    state = signalSlice({
        initialState: this.initialState,
        sources:[
            this.dateRange$.pipe(
                switchMap(dateRange =>
                    this.fetchInvoices(dateRange, 1, 10).pipe(
                        startWith({
                            status: 'loading' as const,
                            current_page: 1,
                            per_page: 10,
                        })
                    )
                )
            ),
        ]
    })

    updateDateRange(range: { startDate: string; endDate: string }) {
        this.dateRange$.next(range);
        
      }
}