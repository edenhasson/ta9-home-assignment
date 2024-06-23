import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManagementToolComponent } from './components/management-tool/management-tool.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ManagementToolComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ta9-home-assignment';
}
