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
  imports: [
    RouterOutlet,
    CommonModule,
    ToolbarComponent,
    HelperListComponent,
    HelperDetailsComponent,
    HelperFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showHelperForm = false;

  helpers = [];  
  selectedHelperId: string | null = null;
  selectedHelper: any = null;

  toggleHelperForm() {
    this.showHelperForm = !this.showHelperForm;
  }

  onSelectHelper(helper: any) {
    this.selectedHelper = helper;
    this.selectedHelperId = helper?.id || null;
  }

  onAddHelper() {
    this.showHelperForm = true;
  }
}
