import { Component, Inject, OnInit, Input } from '@angular/core';
import { HelperDetailsComponent } from '../helper-details/helper-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-kycdoc',
  standalone: true,
  imports: [HelperDetailsComponent, CommonModule, LucideAngularModule],
  templateUrl: './kycdoc.component.html',
  styleUrl: './kycdoc.component.scss'
})
export class KYCDocComponent implements OnInit {

  @Input() selectedHelper: any;
  x = X;
  sanitizedUrl: SafeResourceUrl | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<KYCDocComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
  }

  close() {
    this.dialogRef.close();
  }


}
