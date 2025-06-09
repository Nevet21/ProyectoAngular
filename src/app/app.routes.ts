import { Routes } from '@angular/router';
import { PermissionGuard } from './guards/permission-guard';  // tu guard

import { SignatureComponent } from './pages/signature/signature';
import { Signature } from './pages/signature/signatureUpdate/signatureUpdate';

export const routes: Routes = [
  {
    path: 'passwords/create/:userId',
    loadComponent: () => import('./pages/password/password-create.component').then(m => m.PasswordCreateComponent),
    canActivate: [PermissionGuard],
    data: { requiredPermission: '/passwords/create' }
  },
  {
    path: 'user',
    children: [
      { 
        path: 'list', 
        loadComponent: () => import('./pages/user/list/list').then(m => m.List),
        title: 'Lista de Usuarios',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/user/list' }
      },
      { 
        path: 'create', 
        loadComponent: () => import('./pages/user/manage/manage').then(m => m.Manage),
        title: 'Crear Usuario',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/user/create' }
      },
      { 
        path: 'view/:id', 
        loadComponent: () => import('./pages/user/manage/manage').then(m => m.Manage),
        title: 'Ver Usuario',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/user/view' }
      },
      { 
        path: 'edit/:id', 
        loadComponent: () => import('./pages/user/manage/manage').then(m => m.Manage),
        title: 'Editar Usuario',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/user/edit' }
      }
    ]
  },
  {
    path: 'address',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/address/list/list').then(m => m.AddressList),
        title: 'Lista de Direcciones',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/address/list' }
      },
      {
        path: 'manage',
        loadComponent: () => import('./pages/address/manage/manage').then(m => m.AddressManage),
        title: 'manage Dirección',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/address/manage' }
      },
      {
        path: 'manage/:id',
        loadComponent: () => import('./pages/address/manage/manage').then(m => m.AddressManage),
        title: 'manage Dirección',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/address/manage' }
      },
      {
        path: 'view/:id',
        loadComponent: () => import('./address/view/view').then(m => m.AddressViewComponent),
        title: 'Ver Dirección',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/address/view' }
      },
    ]
  },
  {
    path: 'role',
    children: [
      {
        path: 'list',
        loadComponent: () => import('./pages/Role/list/list').then(m => m.RoleListComponent),
        title: 'Lista de Roles',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/role/list' }
      },
      {
        path: 'manage',
        loadComponent: () => import('./pages/Role/manage/manage').then(m => m.RoleManageComponent),
        title: 'manage Rol',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/role/manage' }
      },
      {
        path: 'manage/:id',
        loadComponent: () => import('./pages/Role/manage/manage').then(m => m.RoleManageComponent),
        title: 'manage Rol',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/role/manage' }
      },
    ]
  },
  {
    path: 'user-role',
    children: [
      {
        path: 'list/:roleId',
        loadComponent: () => import('./pages/user-role/list/list').then(m => m.UserRoleListComponent),
        title: 'Usuarios con Rol',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/user-role/list' }
      },
      {
        path: 'manage/:roleId',
        loadComponent: () => import('./pages/user-role/manage/manage').then(m => m.UserRoleManageComponent),
        title: 'Administrar Usuarios en Rol',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/user-role/manage' }
      },
      {
        path: 'asignar/:userId',
        loadComponent: () => import('./pages/user-role/manage/manage').then(m => m.UserRoleManageComponent),
        title: 'Asignar Roles a Usuario',
        canActivate: [PermissionGuard],
        data: { requiredPermission: '/user-role/asignar' }
      }
    ]
  },
  { 
    path: 'signature/view/:id', 
    component: SignatureComponent,
    canActivate: [PermissionGuard],
    data: { requiredPermission: '/signature/view' }
  },
  {
    path: 'signature/update/:id',
    component: Signature,
    canActivate: [PermissionGuard],
    data: { requiredPermission: '/signature/update' }
  },
  {
    path: 'profile/view/:id',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent ),
    canActivate: [PermissionGuard],
    data: { requiredPermission: '/profile/view' }
  },
  {
    path: 'passwords/user/:userId',
    loadComponent: () => import('./pages/password/password-create.component').then(m => m.PasswordCreateComponent ),
    canActivate: [PermissionGuard],
    data: { requiredPermission: '/passwords/user' }
  },
  {
    path: 'permissions/list',
    loadComponent: () => import('./pages/permissions/permissions').then(m => m.Permissions ),
    canActivate: [PermissionGuard],
    data: { requiredPermission: '/permissions/list' }
  },
  {
    path: 'permissions/role/:roleId',
    loadComponent: () => import('./pages/role-permission/role-permission').then(m => m.RolePermissions ),
    canActivate: [PermissionGuard],
    data: { requiredPermission: '/permissions/role' }
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
    title: 'Login'
  },

  // Redirecciones
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
