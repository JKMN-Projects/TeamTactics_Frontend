import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { AssignPlayerComponent } from '../../modals/assign-player/assign-player.component';
import { Player } from '../../interfaces/player';
import { Formation } from '../../interfaces/formation';
import { MatButtonModule } from '@angular/material/button';
import { AssignCaptainComponent } from '../../modals/assign-captain/assign-captain.component';
import { TeamPlayer } from '../../interfaces/team-player';
import { CompetitionService } from '../../services/competition.service';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
import { MatIconModule } from '@angular/material/icon';
import { Team } from '../../interfaces/team';
import { AssignFormationComponent } from '../../modals/assign-formation/assign-formation.component';

export enum positions {
  Attacker,
  Midfielder,
  Defender,
  Goalkeeper
}

@Component({
  selector: 'app-team-formation',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatSlideToggleModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
  ],
  templateUrl: './team-formation.component.html',
  styleUrl: './team-formation.component.css'
})
export class TeamFormationComponent {
  displayedColumns: string[] = ['name', 'position', 'club', 'captain'];

  players: Player[] = [];

  formation!: Formation;
  formations = new Array<Formation>();
  userRoster = new MatTableDataSource<TeamPlayer>();

  team: Team = {
    id: 0,
    name: "",
    locked: false,
    formation: {
      id: 0,
      name: "",
      goalkeeper: 0,
      defenderAmount: 0,
      midfielderAmount: 0,
      attackerAmount: 0,
    },
    players: []
  };

  constructor(private matDialog: MatDialog, private playerService: PlayerService, private teamService: TeamService) {
    this.teamService.team$.subscribe(team => {
      this.team = team;
      this.formation = team.formation;

      if (team.players.length > 0) {
        this.userRoster.data = team.players;
      }
      else {
        this.formation = this.formations[2];
      }
    });

    this.playerService.players$.subscribe(players => {
      this.players = players;
    });
  }

  emptyPlayerObject(positionId: number, amount: number): TeamPlayer[] {
    let temp = new Array<TeamPlayer>();

    for (let index = 0; index < amount; index++) {
      temp.push({
        id: 0,
        firstName: "Click to",
        lastName: "choose",
        captain: false,
        clubId: 0,
        clubName: "",
        clubShorthand: "",
        positionId: positionId,
        positionName: this.getPositionName(positionId),
      })
    }

    return temp;
  }

  getPositionName(positionId: number) {
    switch (positionId) {
      case 1:
        return "Goalkeeper";
      case 2:
        return "Defender";
      case 3:
        return "Midfielder";
      case 4:
        return "Attacker";
      default:
        break;
    }

    return "";
  }

  getPlayersByPositionId(positionId: number,) {
    let temp: Array<TeamPlayer> = this.userRoster.data.filter(player => player.positionId = positionId);

    switch (positionId) {
      case positions.Attacker:
        if (temp.length < this.team.formation.attackerAmount) {
          temp = temp.concat(this.emptyPlayerObject(positions.Attacker, this.team.formation.attackerAmount - temp.length));
        }
        break;
      case positions.Midfielder:
        if (temp.length < this.team.formation.midfielderAmount) {
          temp = temp.concat(this.emptyPlayerObject(positions.Midfielder, this.team.formation.midfielderAmount - temp.length));
        }
        break;
      case positions.Defender:
        if (temp.length < this.team.formation.defenderAmount) {
          temp = temp.concat(this.emptyPlayerObject(positions.Defender, this.team.formation.defenderAmount - temp.length));
        }
        break;
      case positions.Goalkeeper:
        if (temp.length < this.team.formation.goalkeeper) {
          temp.push(this.emptyPlayerObject(positions.Goalkeeper, 1)[0])
        }
        break;
      default:
        break;
    }

    return temp;
  }

  checkLockAvailability() {
    let playerCount = 0;
    let captainAssigned = false;

    this.userRoster.data.forEach(player => {
      playerCount++;
      captainAssigned = player.captain;
    })

    return playerCount == 11 && captainAssigned ? true : false;
  }

  lockRoster() {
    this.teamService.lockTeam(this.team.id);
  }

  openAssignFormation() {
    this.matDialog.open(AssignFormationComponent, {
      data: {
        teamId: this.team.id,
        formation: this.team.formation,
        roster: this.team.players
      }
    })
  }

  openAssignCaptain() {
    this.matDialog.open(AssignCaptainComponent, {
      width: '600px',
      data: {
        currentCaptain: this.userRoster.data.find(player => player.captain == true),
        userRoster: this.userRoster.data
      }
    }).afterClosed().subscribe(result => {
      this.userRoster.data = result;
    })
  }

  openAssignPlayer(positionId: number, positionName: string, index: number, playerIdToRemove: number) {
    if (playerIdToRemove > 0) {
      this.teamService.removePlayer(this.team.id, playerIdToRemove)
    }

    this.matDialog.open(AssignPlayerComponent, {
      width: '600px',
      data: {
        positionId: positionId,
        positionName: positionName,
        userRoster: this.userRoster.data,
        playerList: this.players.filter(x => x.positionId == positionId),
      }
    }).afterClosed().subscribe(playerAssigned => {
      if (index != undefined && playerAssigned != undefined) {
        this.teamService.assignPlayer(playerAssigned, this.team.id);
        this.teamService.getTeam(this.team.id);
      }
    })
  }

  removePlayer(playerId: number) {
    this.teamService.removePlayer(this.team.id, playerId);
  }
}
