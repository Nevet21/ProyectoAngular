import { Routes } from '@angular/router';
import { AddressList } from './list/list';
import { AddressManage } from './manage/manage';

export const addressRoutes: Routes = [
  { path: '', component: AddressList },
  { path: 'manage', component: AddressManage },
  { path: 'manage/:id', component: AddressManage },
  { path: 'view/:id', component: AddressManage } // Reutilizas AddressManage para ver también
];
