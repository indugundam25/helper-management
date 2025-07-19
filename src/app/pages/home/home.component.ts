import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { HelperListComponent } from '../../components/helper-list/helper-list.component';
import { HelperDetailsComponent } from '../../components/helper-details/helper-details.component';
import { ChevronLeft } from 'lucide-angular';
import { IHelper } from '../../models/helper.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, HelperListComponent, HelperDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showHelperForm = false;
  currentHelperId: string | null = null;

  toggleHelperForm() {
    this.showHelperForm = !this.showHelperForm;
  }

  readonly chevronleft = ChevronLeft;

  helpers = [];
  selectedHelperId: string | null = null;
  selectedHelper: any = null;

  onHelperSelected(helper: IHelper) {
    this.selectedHelper = helper;
    this.currentHelperId = helper._id ?? null;
  }

}
