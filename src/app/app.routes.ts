import { Routes } from '@angular/router';
import { SignatureComponent } from './pages/signature/signature';
import { Signature } from './pages/signature/signatureUpdate/signatureUpdate';


export const routes: Routes = [
  // Ruta para test-services
  {
    path: 'passwords/create/:userId',
    loadComponent: () => import('./pages/password/password-create.component').then(m => m.PasswordCreateComponent)
  },
{
  path: 'user',
  children: [
    { 
      path: 'list', 
      loadComponent: () => import('./pages/user/list/list').then(m => m.List),
      title: 'Lista de Usuarios'
    },
    { 
      path: 'create', 
      loadComponent: () => import('./pages/user/manage/manage').then(m => m.Manage),
      title: 'Crear Usuario'
    },
    { 
      path: 'view/:id', 
      loadComponent: () => import('./pages/user/manage/manage').then(m => m.Manage),
      title: 'Ver Usuario'
    },
    { 
      path: 'edit/:id', 
      loadComponent: () => import('./pages/user/manage/manage').then(m => m.Manage),
      title: 'Editar Usuario'
    }
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
        title: 'manage Dirección'
      },
      {
        path: 'manage/:id',
        loadComponent: () => import('./pages/address/manage/manage').then(m => m.AddressManage),
        title: 'manage Dirección'
      },
      {
        path: 'view/:id',
        loadComponent: () => import('./address/view/view').then(m => m.AddressViewComponent),
        title: 'Ver Dirección'
      },
    ]
  },

  // Rutas para role (existente)
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
        title: 'manage Rol'
      },
      {
        path: 'manage/:id',
        loadComponent: () => import('./pages/Role/manage/manage').then(m => m.RoleManageComponent),
        title: 'manage Rol'
      },
    ]
  },

  // Nuevas rutas para user-role
{
  path: 'user-role',
  children: [
    {
      path: 'list/:roleId',  // Ruta para listar usuarios por rol, ejemplo: /user-role/list/1
      loadComponent: () => import('./pages/user-role/list/list').then(m => m.UserRoleListComponent),
      title: 'Usuarios con Rol'
    },
    {
      path: 'manage/:roleId',  // Ruta para manejar asignaciones de usuarios a un rol, ejemplo: /user-role/manage/1
      loadComponent: () => import('./pages/user-role/manage/manage').then(m => m.UserRoleManageComponent),
      title: 'Administrar Usuarios en Rol'
    },
    {
      path: 'asignar/:userId',  // Ruta para asignar roles a un usuario específico, ejemplo: /user-role/asignar/3
      loadComponent: () => import('./pages/user-role/manage/manage').then(m => m.UserRoleManageComponent),
      title: 'Asignar Roles a Usuario'
    }
  ]
  //signature
},
{ path: 'signature/view/:id', component: SignatureComponent },
 {
    path: 'signature/update/:id',
    component: Signature
  },

  //profile 
  {
  path: 'profile/view/:id',
  loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent )
},
 {
  path: 'passwords/user/:userId',
  loadComponent: () => import('./pages/password/password-create.component').then(m => m.PasswordCreateComponent )
},
 {
  path: 'permissions/list',
  loadComponent: () => import('./pages/permissions/permissions').then(m => m.Permissions )
},
 {
  path: 'permissions/role/:roleId',
  loadComponent: () => import('./pages/role-permission/role-permission').then(m => m.RolePermissions )
},





  // Redirecciones
  { path: '', redirectTo: '/user/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/user/list' }
];