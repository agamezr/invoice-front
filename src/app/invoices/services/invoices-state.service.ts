import { inject, Injectable } from "@angular/core";
import { InvoicesService } from "./invoices.service";
import { Invoice } from "../../shared/interfaces/invoice.interface";
import { signalSlice } from 'ngxtension/signal-slice';

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

    state = signalSlice({
        initialState: this.initialState,
        sources:[]
    })
}