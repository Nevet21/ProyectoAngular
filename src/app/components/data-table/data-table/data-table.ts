import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';  // <-- Importa CommonModule
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  standalone: true,  // IMPORTANTE que sea standalone si lo usas así
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.scss'],
  imports: [
    CommonModule,    // <-- Necesario para *ngFor, *ngIf, etc.
    MatTableModule
  ]
})
export class DataTableComponent {
  @Input() columns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() displayedLabels: string[] = [];

  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() custom = new EventEmitter<{action: string, row: any}>();

  onAction(action: string, row: any) {
    this.custom.emit({ action, row });
  }
}
