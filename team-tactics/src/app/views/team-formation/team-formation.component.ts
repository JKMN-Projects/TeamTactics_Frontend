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
  Default,
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
  userRoster = new MatTableDataSource<TeamPlayer>();
  teamPlayers = new Array<TeamPlayer>();
  players = new Array<Player>();
  formation: Formation;
  team: Team;

  formations: Array<Formation> = [
    {
      name: "3-4-3",
      goalkeeperAmount: 1,
      goalkeeper: this.emptyPlayerObject(4, 1)[0],
      defenderAmount: 3,
      defenders: this.emptyPlayerObject(3, 3),
      midfielderAmount: 4,
      midfielders: this.emptyPlayerObject(2, 4),
      attackerAmount: 3,
      attackers: this.emptyPlayerObject(1, 3)
    },
    {
      name: "3-5-2",
      goalkeeperAmount: 1,
      goalkeeper: this.emptyPlayerObject(4, 1)[0],
      defenderAmount: 3,
      defenders: this.emptyPlayerObject(3, 3),
      midfielderAmount: 5,
      midfielders: this.emptyPlayerObject(2, 5),
      attackerAmount: 2,
      attackers: this.emptyPlayerObject(1, 2)
    },
    {
      name: "4-4-2",
      goalkeeperAmount: 1,
      goalkeeper: this.emptyPlayerObject(4, 1)[0],
      defenderAmount: 4,
      defenders: this.emptyPlayerObject(3, 4),
      midfielderAmount: 4,
      midfielders: this.emptyPlayerObject(2, 4),
      attackerAmount: 2,
      attackers: this.emptyPlayerObject(1, 2)
    },
    {
      name: "4-3-3",
      goalkeeperAmount: 1,
      goalkeeper: this.emptyPlayerObject(4, 1)[0],
      defenderAmount: 4,
      defenders: this.emptyPlayerObject(3, 4),
      midfielderAmount: 3,
      midfielders: this.emptyPlayerObject(2, 3),
      attackerAmount: 3,
      attackers: this.emptyPlayerObject(1, 3)
    },
    {
      name: "4-5-1",
      goalkeeperAmount: 1,
      goalkeeper: this.emptyPlayerObject(4, 1)[0],
      defenderAmount: 4,
      defenders: this.emptyPlayerObject(3, 4),
      midfielderAmount: 5,
      midfielders: this.emptyPlayerObject(2, 5),
      attackerAmount: 1,
      attackers: this.emptyPlayerObject(1, 1)
    },
    {
      name: "5-3-2",
      goalkeeperAmount: 1,
      goalkeeper: this.emptyPlayerObject(4, 1)[0],
      defenderAmount: 5,
      defenders: this.emptyPlayerObject(3, 5),
      midfielderAmount: 3,
      midfielders: this.emptyPlayerObject(2, 3),
      attackerAmount: 2,
      attackers: this.emptyPlayerObject(1, 2)
    },
    {
      name: "5-4-1",
      goalkeeperAmount: 1,
      goalkeeper: this.emptyPlayerObject(4, 1)[0],
      defenderAmount: 5,
      defenders: this.emptyPlayerObject(3, 5),
      midfielderAmount: 4,
      midfielders: this.emptyPlayerObject(2, 4),
      attackerAmount: 1,
      attackers: this.emptyPlayerObject(1, 1)
    },
  ];

  constructor(private matDialog: MatDialog, private playerService: PlayerService, private teamService: TeamService) {
    this.formation = this.getFormation("4-4-2");

    this.team = {
      id: 0,
      name: "",
      isLocked: false,
      status: 0,
      formation: "4-4-2",
      players: []
    };

    this.teamService.team$.subscribe(team => {
      this.team = team;

      if (this.team.formation) {
        this.formation = this.getFormation(this.team.formation);
      }

      if (this.team.players && this.team.players.length > 0) {
        this.userRoster.data = this.team.players;
        this.setFormation();
      }
    });

    this.playerService.players$.subscribe(players => {
      this.players = players;
    });
  }

  getFormation(formationName: string) {
    return JSON.parse(JSON.stringify(this.formations.find(formation => formation.name == formationName)!));
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
      case positions.Attacker:
        return "Attacker";
      case positions.Midfielder:
        return "Midfielder";
      case positions.Defender:
        return "Defender";
      case positions.Goalkeeper:
        return "Goalkeeper";
      default:
        break;
    }

    return "";
  }

  setFormation() {

    this.userRoster.data.forEach(player => {
      switch (player.positionId) {
        case positions.Attacker:
          this.formation.attackers[this.formation.attackers.findIndex(a => a.id == 0)] = player;
          break;
        case positions.Midfielder:
          this.formation.midfielders[this.formation.midfielders.findIndex(m => m.id == 0)] = player;
          break;
        case positions.Defender:
          this.formation.defenders[this.formation.defenders.findIndex(d => d.id == 0)] = player;
          break;
        case positions.Goalkeeper:
          this.formation.goalkeeper = player;
          break;
        default:
          break;
      }
    })
  }

  checkIfLocked() {
    if (this.team.isLocked) {
      return true;
    }

    return false;
  }

  checkLockAvailability() {
    if (this.checkIfLocked()) {
      return true;
    }

    let playerCount = 0;
    let captainAssigned = false;

    this.userRoster.data.forEach(player => {
      playerCount++;
      if (player.captain) {
        captainAssigned = true;
      }
    })

    return playerCount == 11 && captainAssigned ? false : true;
  }

  lockRoster() {
    this.teamService.lockTeam(this.team.id);
  }

  openAssignFormation() {
    this.matDialog.open(AssignFormationComponent, {
      data: {
        teamId: this.team.id,
        formation: this.team.formation,
        formations: this.formations,
        roster: this.team.players,
      }
    })
  }

  openAssignCaptain() {
    this.matDialog.open(AssignCaptainComponent, {
      width: '600px',
      data: {
        currentCaptain: this.userRoster.data.find(player => player.captain == true),
        userRoster: this.userRoster.data,
        teamId: this.team.id
      }
    })
  }

  openAssignPlayer(positionId: number, positionName: string, playerIdToRemove: number) {
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
        teamId: this.team.id
      }
    })
  }

  removePlayer(playerId: number) {
    this.teamService.removePlayer(this.team.id, playerId);
  }
}
