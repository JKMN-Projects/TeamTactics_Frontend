import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Player } from '../../interfaces/player';
import { TeamPlayer } from '../../interfaces/team-player';
import { TeamService } from '../../services/team.service';
import { AssignCaptain } from '../../interfaces/assign-captain';

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
    playerList = new Array<TeamPlayer>();

    constructor(@Inject(MAT_DIALOG_DATA) private data: { currentCaptain: TeamPlayer | undefined, userRoster: TeamPlayer[], teamId: number },
    private matDialogRef: MatDialogRef<AssignCaptainComponent>, private teamService: TeamService) {
      this.playerList = this.data.userRoster.filter(player => player.id > 0);

      if (this.data.currentCaptain != undefined) {
        this.captain.setValue(this.data.currentCaptain);
      }
    }

    onSubmit() {
      let captain: AssignCaptain = {
        playerId: (this.captain.value as Player).id
      }

      this.teamService.assignCaptain(captain, this.data.teamId);

      this.matDialogRef.close();
    }
}
