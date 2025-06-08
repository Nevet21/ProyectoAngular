import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../../../components/dynamic-form/dynamic-form/dynamic-form';

@Component({
  standalone: true,
  selector: 'app-address-manage',
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './manage.html',
  styleUrls: ['./manage.scss'],
})
export class AddressManage {
  // Usamos 'name' en lugar de 'key' para que sea compatible con DynamicFormComponent
  fields = [
    { name: 'street', label: 'Street', type: 'text', required: true },
    { name: 'number', label: 'Number', type: 'text', required: true },
    { name: 'userId', label: 'User ID', type: 'number', required: true }
  ];
}
