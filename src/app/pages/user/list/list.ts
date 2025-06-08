import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user-service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { EntityTableComponent } from '../../../components/entity-table/entity-table';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
  imports: [
    CommonModule,
    RouterModule,
    EntityTableComponent
  ]
})
export class List implements OnInit {
  users: User[] = [];

  userActions = [
    { label: 'View', route: (row: any) => `/user/view/${row.id}` },
    { label: 'Update', route: (row: any) => `/user/manage/${row.id}` },
    {
      label: 'Delete',
      action: (row: any) => this.delete(row.id),
      isDelete: true
    },
    { label: 'Profile', route: (row: any) => `/profile/view/${row.id}` },
    { label: 'Address', route: (row: any) => `/address/view/${row.id}` },
    { label: 'Digital Signature', route: (row: any) => `/signature/view/${row.id}` },
    { label: 'Devices', route: (row: any) => `/device/list/${row.id}` },
    { label: 'Passwords', route: (row: any) => `/passwords/user/${row.id}` },
    { label: 'Sessions', route: (row: any) => `/sessions/user/${row.id}` }
  ];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.userService.list().subscribe({
      next: (users) => {
        this.users = users;
      }
    });
  }

  create() {
    this.router.navigate(['user/manage']);
  }

  edit(id: number) {
    this.router.navigate(['user/manage', id]);
  }

  view(id: number) {
    this.router.navigate(['user/view', id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que desea eliminar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result: SweetAlertResult<any>) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(() => {
          Swal.fire('Eliminado!', 'Usuario eliminado correctamente.', 'success');
          this.list();
        });
      }
    });
  }
}
