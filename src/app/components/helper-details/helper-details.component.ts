import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Pencil, Trash } from 'lucide-angular';

@Component({
  selector: 'app-helper-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './helper-details.component.html',
  styleUrls: ['./helper-details.component.scss']
})
export class HelperDetailsComponent implements OnInit {
  readonly pencil = Pencil;
  readonly trash = Trash;
  @Input() helper: any = [];
  selectedHelper = this.helper[0];
  ngOnInit(): void {
    this.selectedHelper = this.helper[0];
  }
}

