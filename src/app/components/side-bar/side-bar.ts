import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './side-bar.html',
  styleUrls: ['./side-bar.scss'],
  imports: [CommonModule, RouterModule, MatListModule]
})
export class Sidebar {}
