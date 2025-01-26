import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'invoices', 
        loadChildren: () => import('./invoices/features/invoices-shell/invoices.route')
    },
    {
        path: '**',
        redirectTo: 'invoices'
    }
];