import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user-service';
import { DynamicFormComponent } from "../../../components/dynamic-form/dynamic-form/dynamic-form";

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DynamicFormComponent
  ],
  templateUrl: './manage.html',
  styleUrls: ['./manage.scss']
})
export class Manage implements OnInit {
  mode: 'view' | 'create' | 'edit' = 'create';

  formConfig = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      disabled: false // Se actualizará luego según el modo
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      disabled: false
    }
  ];

  initialData: Partial<User> = {};

  get submitLabel(): string {
    return {
      'view': 'View',
      'create': 'Create',
      'edit': 'Update'
    }[this.mode];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const path = this.route.snapshot.routeConfig?.path;

    // Determinar el modo
    if (path?.includes('view')) {
      this.mode = 'view';
    } else if (path?.includes('edit')) {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }

    // Actualizar los campos según el modo
    this.updateFormConfig();

    // Cargar datos si corresponde
    if (id && this.mode !== 'create') {
      this.userService.view(id).subscribe({
        next: (user) => {
          this.initialData = user;
        },
        error: (err) => console.error(err)
      });
    }
  }

  onSubmit(formValue: User) {
    const navigationPath = '/user/list';

    if (this.mode === 'create') {
      this.userService.create(formValue).subscribe({
        next: () => this.router.navigate([navigationPath])
      });
    } else if (this.mode === 'edit') {
      this.userService.update({
        ...this.initialData,
        ...formValue
      }).subscribe({
        next: () => this.router.navigate([navigationPath])
      });
    } else if (this.mode === 'view') {
      // No hacer nada, es sólo vista
      console.log('Visualización activa: no se envía el formulario.');
    }
  }

  private updateFormConfig(): void {
    const disable = this.mode === 'view';
    this.formConfig = this.formConfig.map(field => ({
      ...field,
      disabled: disable
    }));
  }
}
