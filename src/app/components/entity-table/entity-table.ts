import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface EntityAction {
  label: string;
  route?: (row: any) => string;
  action?: (row: any) => void;
  isDelete?: boolean;
  icon?: string;
  tooltip?: string;
  color?: 'primary' | 'accent' | 'warn';
}

@Component({
  selector: 'entity-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './entity-table.html',
  styleUrls: ['./entity-table.scss']
})
export class EntityTableComponent {
  @Input() title: string = 'Entities';
  @Input() createRoute: string = '';
  @Input() createLabel: string = 'Create New';
  @Input() displayedColumns: string[] = [];
  @Input() columnsLabels: { [key: string]: string } = {};
  @Input() dataSource: any[] = [];
  @Input() actions: EntityAction[] = [];
  @Input() showCreateButton: boolean = true;
  @Input() loading: boolean = false;

  constructor(private router: Router) {}

  getColumnLabel(column: string): string {
    return this.columnsLabels[column] || column;
  }
  ngOnInit() {
  console.log('🛠️ createRoute en ngOnInit:', this.createRoute);
}


performAction(action: EntityAction, row: any): void {
  console.log('performAction called', action, row);
  if (action.action) {
    action.action(row);
  } else if (action.route) {
    this.router.navigate([action.route(row)]);
  }
}



  getActionColor(action: EntityAction): string {
    if (action.color) return action.color;
    return action.isDelete ? 'warn' : 'primary';
  }

  navigateToCreate(): void {
  console.log('➡️ Navegando a:', this.createRoute);
  if (this.createRoute) {
    this.router.navigate([this.createRoute]);
  }
}

}