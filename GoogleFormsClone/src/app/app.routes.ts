import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/form-builder', pathMatch: 'full' },

    {
        path: 'form-builder',
        loadComponent: () => import('./component/google-forms/google-forms.component').then(m => m.GoogleFormsComponent),
      },
      { path: '**', redirectTo: '/form-builder' },
];
