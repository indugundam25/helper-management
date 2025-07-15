import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { HelperListComponent } from '../../components/helper-list/helper-list.component';
import { HelperDetailsComponent } from '../../components/helper-details/helper-details.component';

import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChevronLeft } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, HelperListComponent, HelperDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   showHelperForm = false;

  toggleHelperForm() {
    this.showHelperForm = !this.showHelperForm;
  }

  readonly chevronleft = ChevronLeft;

  helpers = [];  
  selectedHelperId: string | null = null;
  selectedHelper: any = null;

  onSelectHelper(helper: any) {
    this.selectedHelper = helper;
    this.selectedHelperId = helper?.id || null;
  }
   
}
