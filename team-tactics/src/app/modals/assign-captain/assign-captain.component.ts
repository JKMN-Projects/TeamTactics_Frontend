import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-assign-captain',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './assign-captain.component.html',
  styleUrl: './assign-captain.component.css'
})
export class AssignCaptainComponent {
    captain = new UntypedFormControl(null, [Validators.required]);
    playerList = new Array<Player>();

    constructor(@Inject(MAT_DIALOG_DATA) private data: { currentCaptain: Player | undefined, userRoster: Player[] }, private matDialogRef: MatDialogRef<AssignCaptainComponent>) {
      this.playerList = this.data.userRoster.filter(player => player.id > 0);

      if (this.data.currentCaptain != undefined) {
        this.captain.setValue(this.data.currentCaptain);
      }
    }

    onSubmit() {
      this.data.userRoster.forEach(player => {
        if (player.id == (this.captain.value as Player).id) {
          player.captain = true;
        }
        else {
          player.captain == false;
        }
      })

      this.matDialogRef.close(this.data.userRoster)
    }
}
