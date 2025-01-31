import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invoice } from "../../shared/interfaces/invoice.interface";
import { environment } from "../../../environments/environment";

interface InvoiceResponse {
    invoices: Invoice[];
    page: number;
    total_pages: number;
    total_data: number;
    per_page: number;
}

@Injectable({
    providedIn: 'root'
})

export class InvoicesService {
    apiUrl = environment.API_URL;
    constructor(private http: HttpClient) { }

    getInvoices(
        dateRange: { startDate: string, endDate: string }, page: number, per_page: number
        ): Observable<InvoiceResponse> {
            const headers = new HttpHeaders({
                'Authorization': '*',
                'Access-Control-Allow-Origin': '*',
               "Access-Control-Allow-Headers": "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
               "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
               "Allow": "GET, POST, OPTIONS, PUT, DELETE"
              });
            const params = new HttpParams()
                .set('start_date', dateRange.startDate)
                .set('end_date', dateRange.endDate)
                .set('page', page.toString())
                .set('per_page', per_page.toString());

            return this.http.get<InvoiceResponse>(`${this.apiUrl}/invoices/range` , {params, headers});
        }
}
