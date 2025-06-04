import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestServices } from "./test-services/test-services";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestServices],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ProyectoAngular';
}
