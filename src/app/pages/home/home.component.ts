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
  helpers: IHelper[] = [];
  chevronleft = ChevronLeft;

  constructor() { }

}

