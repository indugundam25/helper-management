import { Component, Inject } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import QRCode from 'qrcode';
@Component({
  selector: 'app-id-card',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './id-card.component.html',
  styleUrl: './id-card.component.scss'
})
export class IdCardComponent {
  x = X;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<IdCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { presentHelper: any }
  ) { this.generateQrCodeDataURLForName() }

  closeAndNavigateHome() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }

  async generateQrCodeDataURLForName() {
    try {
      const name = this.data.presentHelper.name;
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
