import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamService } from '../../services/team.service';
import { Formation } from '../../interfaces/formation';
import { TeamPlayer } from '../../interfaces/team-player';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { positions } from '../../views/team-formation/team-formation.component';

@Component({
  selector: 'app-assign-formation',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './assign-formation.component.html',
  styleUrl: './assign-formation.component.css'
})
export class AssignFormationComponent {
  formationControl = new FormControl(null, [Validators.required]);
  formations = new Array<Formation>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: { teamId: number, formation: Formation, roster: TeamPlayer[] },
    private teamService: TeamService, private matDialogRef: MatDialogRef<AssignFormationComponent>) {
    this.teamService.getFormations();

    this.teamService.formations$.subscribe(formations => {
      this.formations = formations;
    })
  }

  onSubmit() {
    let errorMsg = this.checkFormationAvailability(this.formationControl.value!);

    if (errorMsg.length > 0) {
      alert(errorMsg);
    }
    else {
      this.teamService.assignFormation(this.data.teamId, this.formationControl.value!);
    }
  }

  checkFormationAvailability(formation: Formation): string {
    let error = "";

    error += formation.defenderAmount < this.getPlayersByPositionId(positions.Defender).length ? "Remove defenders to match formation amount to enable selection of this formation. \n" : "";
    error += formation.midfielderAmount < this.getPlayersByPositionId(positions.Midfielder).length ? "Remove midfielders to match formation amount to enable selection of this formation. \n" : "";
    error += formation.attackerAmount < this.getPlayersByPositionId(positions.Attacker).length ? "Remove attackers to match formation amount to enable selection of this formation. " : "";

    return error;
  }

  getPlayersByPositionId(positionId: number,) {
    let temp = this.data.roster.filter(player => player.positionId = positionId);

    return temp;
  }
}
