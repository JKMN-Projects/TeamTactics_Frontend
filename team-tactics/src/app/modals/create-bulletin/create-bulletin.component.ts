import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateBulletin } from '../../interfaces/create-bulletin';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-bulletin',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './create-bulletin.component.html',
  styleUrl: './create-bulletin.component.css'
})
export class CreateBulletinComponent {
  bulletin = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(500)])

  constructor(@Inject(MAT_DIALOG_DATA) private data: { tournamentId: number, userId: number }, private matDialogRef: MatDialogRef<CreateBulletinComponent>) {
  }

  onSubmit() {
    let bulletin = {
      text: this.bulletin.value,
      tournamentId: this.data.tournamentId,
      userId: this.data.userId
    } as CreateBulletin;

    // Call service

    this.matDialogRef.close();
  }
}
