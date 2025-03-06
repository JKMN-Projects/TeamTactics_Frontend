import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../../interfaces/player';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TeamPlayer } from '../../interfaces/team-player';

@Component({
  selector: 'app-assign-player',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './assign-player.component.html',
  styleUrl: './assign-player.component.css'
})
export class AssignPlayerComponent {
  player = new FormControl(null, [Validators.required]);
  position = "";
  unavailableClubIds = new Array<number>();
  unavailablePlayerIds = new Array<number>();
  filteredPlayerList = new Array<Player>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: { positionId: number, positionName: string, userRoster: TeamPlayer[], playerList: Player[] },
  private matDialogRef: MatDialogRef<AssignPlayerComponent>) {


    this.data.userRoster.forEach(player => {
      this.unavailablePlayerIds.push(player.id);
    });

    this.position = this.data.positionName;

    this.findDuplicateIds();
    this.filterPlayerList();
  }

  findDuplicateIds() {
    let idCount = new Map<number, number>();

    this.data.userRoster.forEach(item => {
      idCount.set(item.clubId, (idCount.get(item.clubId) || 0) + 1);
    });

    idCount.forEach((count, id) => {
      if (count === 2) {
        this.unavailableClubIds.push(id);
      }
    });
  }

  filterPlayerList() {
    this.filteredPlayerList = this.data.playerList.filter(player => player.positionId == this.data.positionId &&
      this.unavailableClubIds.includes(player.clubId) == false &&
      this.unavailablePlayerIds.includes(player.id) == false);
  }

  onSubmit() {


    this.matDialogRef.close(this.player.value)
  }
}
