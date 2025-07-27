import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { HelperListComponent } from '../../components/helper-list/helper-list.component';
import { HelperDetailsComponent } from '../../components/helper-details/helper-details.component';
import { ChevronLeft } from 'lucide-angular';
import { IHelper } from '../../models/helper.model';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, HelperListComponent, HelperDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selectedHelper: IHelper | null = null;
  helpers: IHelper[] = [];
  chevronleft = ChevronLeft;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.loadHelpers();
  }

  async loadHelpers() {
    this.helperService.getAllHelpers().subscribe((res) => {
      this.helpers = res.helpers;
      if (this.helpers.length > 0) {
        // this.selectedHelper = this.helperService._users()[0];
        this.selectedHelper = this.helpers[0];
      }
    });
  }
  onHelperSelected(helper: IHelper) {
    this.selectedHelper = helper;   //emitted from cardclick()
  }

}

