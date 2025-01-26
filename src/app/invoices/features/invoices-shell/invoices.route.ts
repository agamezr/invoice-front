import { Routes } from "@angular/router";

export default[
    {
        path: '', loadComponent: () => import('../invoices-list/invoices-list.component')
    }
] as Routes