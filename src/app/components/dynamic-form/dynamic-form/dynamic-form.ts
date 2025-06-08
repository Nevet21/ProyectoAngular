import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,   // marca el componente como standalone
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,CommonModule],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss']
  
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfig: { name: string, label: string, type: string, required?: boolean }[] = [];
  @Input() initialData: any = {};
  @Input() submitLabel: string = 'Create';

  // Nuevo input para modo readonly
  @Input() readonly: boolean = false;

  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: any = {};
    this.formConfig.forEach(field => {
      group[field.name] = [
        this.initialData[field.name] || '',
        field.required ? Validators.required : null
      ];
    });
    this.form = this.fb.group(group);

    // Si está en readonly, deshabilitamos todo el formulario
    if (this.readonly) {
      this.form.disable();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
