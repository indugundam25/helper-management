import { Component, Inject } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import QRCode from 'qrcode';
import { CommonModule } from '@angular/common';
import { IHelper } from '../../models/helper.model';
@Component({
  selector: 'app-show-id',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './show-id.component.html',
  styleUrl: './show-id.component.scss'
})
export class ShowIDComponent {
  x = X;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<ShowIDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { helper: IHelper }

  ) { this.generateQrCodeDataURLForName() }

  closeAndNavigateHome() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }

  async generateQrCodeDataURLForName() {
    try {
      const name = this.data.helper.name;
      console.log(this.data.helper);
      const dataUrl = await QRCode.toDataURL(name);
      const imgElement = document.createElement('img');
      imgElement.src = dataUrl;
      document.getElementById('qrcode-container')?.appendChild(imgElement);
      console.log('QR code image generated successfully!');
    } catch (err) {
      console.error('Error generating QR code data URL:', err);
    }
  }
}
