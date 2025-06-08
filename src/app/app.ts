import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from "./components/side-bar/side-bar";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Sidebar
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'ProyectoAngular';
}