import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { IHelper } from '../../models/helper.model';

@Component({
  selector: 'app-helper-tab',
  templateUrl: './helper-tab.component.html',
  styleUrls: ['./helper-tab.component.scss']
})
export class HelperTabComponent implements OnInit {
  helpers: IHelper[] = [];

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
    this.helperService.getAllHelpers().subscribe({
      next: (res) => this.helpers = res.data,
      error: (err) => console.error('Failed to fetch helpers:', err)
    });
  }

  displayHelper(helper: IHelper): void {
    // You can emit an event or navigate to a detail view here
    console.log('Selected helper:', helper);
  }
}
