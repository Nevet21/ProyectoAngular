import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataTableComponent } from '../../../components/data-table/data-table/data-table';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class AddressList {
  addresses = [
    { id: 1, street: 'Main St', number: 123 },
    { id: 2, street: 'Elm St', number: 456 }
  ];

  constructor(private router: Router) {}

  onView(row: any) {
    this.router.navigate(['/address', row.id]);
  }

  onEdit(row: any) {
    this.router.navigate(['/address/manage', row.id]);
  }

  onDelete(row: any) {
    // Aquí va lógica para borrar
    console.log('Eliminar', row);
  }

  onCustomAction(event: { action: string, row: any }) {
    console.log('Acción personalizada', event);
  }
}
