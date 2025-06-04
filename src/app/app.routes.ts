import { Routes } from '@angular/router';

export const routes: Routes = [

{
  path: 'test-services',
  loadComponent: () => import('./test-services/test-services').then(m => m.TestServices)
}

];
