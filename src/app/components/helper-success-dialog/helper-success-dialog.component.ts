import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { IdCardComponent } from '../id-card/id-card.component';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-helper-success-dialog',
  template: `
    <div class="dialog-content">
     <img src="assets/success.gif" alt="Success Animation" />
      <p>{{data.name}} added</p>
     <button mat-raised-button color="primary" (click)="openId()">OK</button>
    </div>
  `,
  styles: [
    `.dialog-content {
      text-align: center;
      padding: 2rem 2.5rem;
    }
    h2 {
      margin-bottom: 1rem;
      color: #388e3c;
    }
    p {
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
    button {
      min-width: 100px;
      min-height : 30px;
      border-radius : 5px;
      background-color : #83baeaff;
    }
  `],
  standalone: true,
  imports: [RouterLink]
})
export class HelperSuccessDialogComponent {

  currentHelper: any;
  currentEmpCode: any;
  currentDate: any;

  constructor(
    private dialog: MatDialog,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<HelperSuccessDialogComponent, IdCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      helper: any; name: string; empId: number; date: string
    }
  ) { this.currentHelper = data.helper; this.currentEmpCode = data.empId, this.currentDate = data.date }

  openId() {
    const dialogRef = this.dialog.open(IdCardComponent, {
      width: '700px',
      disableClose: true,
      data: {
        presentHelper: this.currentHelper,
        presentEmpCode: this.currentEmpCode,
        presentDate: this.currentDate
      }
    });
    this.dialogRef.close();
  }

} 