import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invoice } from "../../shared/interfaces/invoice.interface";

interface InvoiceResponse {
    invoices: Invoice[];
}

@Injectable({
    providedIn: 'root'
})

export class InvoicesService {
    constructor(private http: HttpClient) { }

    getInvoices(
        dateRange: { startDate: string, endDate: string }
        ): Observable<InvoiceResponse> {
            const params = new HttpParams()
                .set('start_date', dateRange.startDate)
                .set('end_date', dateRange.endDate);

            return this.http.get<InvoiceResponse>('', {params});
        }

}
