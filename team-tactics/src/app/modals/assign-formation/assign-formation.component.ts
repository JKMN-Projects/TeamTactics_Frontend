import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
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
import { AssignFormation } from '../../interfaces/assign-formation';

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
  formationControl = new UntypedFormControl(null, [Validators.required]);
  formations = new Array<Formation>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: { teamId: number, formation: Formation, formations: Formation[], roster: TeamPlayer[] },
    private teamService: TeamService, private matDialogRef: MatDialogRef<AssignFormationComponent>) {
    this.formations = this.data.formations;
    this.formationControl.setValue(this.data.formation);
  }

  onSubmit() {
    let errorMsg = this.checkFormationAvailability(this.formationControl.value!);

    if (errorMsg.length > 0) {
      alert(errorMsg);
    }
    else {
      let formation: AssignFormation = { name: (this.formationControl.value! as Formation).name };

      this.teamService.assignFormation(this.data.teamId, formation);
      this.matDialogRef.close();
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
