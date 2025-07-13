import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HelperListComponent } from './helper-list/helper-list.component';
import { HelperDetailsComponent } from './helper-details/helper-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, HelperListComponent, HelperDetailsComponent],
  templateUrl: './app.component.html',  
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'helper-management';
  selectedHelper: any;
}
