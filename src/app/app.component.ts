import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HelperListComponent } from './helper-list/helper-list.component';
import { HelperDetailsComponent } from './helper-details/helper-details.component';
import { HelperFormComponent } from './helper-form/helper-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, HelperListComponent, HelperDetailsComponent,HelperFormComponent, CommonModule],
  templateUrl: './app.component.html',  
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showHelperForm = false;
  title = 'helper-management';
  selectedHelper: any;

  toggleHelperForm() {
    this.showHelperForm = !this.showHelperForm;
  }
}
