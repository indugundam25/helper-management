import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { HelperDetailsComponent } from '../helper-details/helper-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-kycdoc',
  standalone: true,
  imports: [HelperDetailsComponent, CommonModule],
  templateUrl: './kycdoc.component.html',
  styleUrl: './kycdoc.component.scss'
})
export class KYCDocComponent {

  @Output() docOpened = new EventEmitter<string>();

  // constructor(
  //   private dialogRef: MatDialogRef<KYCDocComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: { message?: string }
  // ) { }
  // close() {
  //   this.dialogRef.close();
  // }


}
