import { Component, Inject, OnInit, Input } from '@angular/core';
import { HelperDetailsComponent } from '../helper-details/helper-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HelperService } from '../../services/helper.service';
import { IDocument } from '../../models/helper.model';
@Component({
  selector: 'app-kycdoc',
  standalone: true,
  imports: [HelperDetailsComponent, CommonModule],
  templateUrl: './kycdoc.component.html',
  styleUrl: './kycdoc.component.scss'
})
export class KYCDocComponent implements OnInit {

  @Input() selectedHelper: any;
  // doc: IDocument | undefined;

  constructor(private helperService: HelperService,
    private dialogRef: MatDialogRef<KYCDocComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // this.doc = this.helperService.getHelper().subscribe()
  }




  close() {
    this.dialogRef.close();
  }


}
