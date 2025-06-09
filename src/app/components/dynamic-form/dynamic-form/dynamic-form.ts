import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfig: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  }[] = [];

  @Input() initialData: any = {};
  @Input() submitLabel: string = 'Create';
  @Input() readonly: boolean = false;

  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: any = {};

    this.formConfig.forEach(field => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.type === 'email') {
        validators.push(Validators.email);
      }

      if (field.type === 'number') {
        if (field.min !== undefined) {
          validators.push(Validators.min(field.min));
        }
        if (field.max !== undefined) {
          validators.push(Validators.max(field.max));
        }
      }

      if (field.pattern) {
        validators.push(Validators.pattern(field.pattern));
      }

      group[field.name] = [
        this.initialData[field.name] ?? '',
        validators
      ];
    });

    this.form = this.fb.group(group);

    if (this.readonly) {
      this.form.disable();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched(); // Para mostrar errores si no es válido
    }
  }
}
