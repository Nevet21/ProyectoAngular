import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta para test-services (si aún la necesitas)
  {
    path: 'passwords/create/:userId',
    loadComponent: () => import('./components/password/password-create.component').then(m => m.PasswordCreateComponent)
  },

  // Rutas para user
  {
    path: 'user',
    children: [
      { 
        path: 'list', 
        loadComponent: () => import('./pages/user/list/list').then(m => m.List),
        title: 'Lista de Usuarios'
      },
      { 
        path: 'manage', 
        loadComponent: () => import('./pages/user/manage/manage').then(m => m.Manage),
        title: 'Crear Usuario'
      },
      { 
        path: 'manage/:id', 
        loadComponent: () => import('./pages/user/manage/manage').then(m => m.Manage),
        title: 'Editar Usuario'
      },
    ]
  },

  // Rutas para address
  {
    path: 'address',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/address/list/list').then(m => m.AddressList),
        title: 'Lista de Direcciones'
      },
      {
        path: 'manage',
        loadComponent: () => import('./pages/address/manage/manage').then(m => m.AddressManage),
        title: 'Crear Dirección'
      },
      {
        path: 'manage/:id',
        loadComponent: () => import('./pages/address/manage/manage').then(m => m.AddressManage),
        title: 'Editar Dirección'
      },
      {
        path: 'view/:id',
        loadComponent: () => import('./address/view/view').then(m => m.AddressViewComponent),
        title: 'Ver Dirección'
      },
    ]
  },


{
  path: 'role',
  children: [
    {
      path: 'list',
      loadComponent: () => import('./pages/Role/list/list').then(m => m.RoleListComponent),
      title: 'Lista de Roles'
    },
    {
      path: 'manage',
      loadComponent: () => import('./pages/Role/manage/manage').then(m => m.RoleManageComponent),
      title: 'Crear Rol'
    },
    {
      path: 'manage/:id',
      loadComponent: () => import('./pages/Role/manage/manage').then(m => m.RoleManageComponent),
      title: 'Editar Rol'
    },

  ]
},

{
  path: 'login',
  loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  title: 'Iniciar sesión'
}
,

{
  path: 'dashboard',
  loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  canActivate: [() => import('./auth/auth-guard').then(m => m.AuthGuard)],
  title: 'Dashboard'
},


  // Redirecciones
  { path: '', redirectTo: '/user/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/user/list' }

];