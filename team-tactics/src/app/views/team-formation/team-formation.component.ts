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

enum positions {
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
    NgClass,
  ],
  templateUrl: './team-formation.component.html',
  styleUrl: './team-formation.component.css'
})
export class TeamFormationComponent {
  displayedColumns: string[] = ['name', 'position', 'club', 'captain'];

  premierLeagueClubs = [
    { clubId: 1, clubName: 'Arsenal' },
    { clubId: 2, clubName: 'Aston Villa' },
    { clubId: 3, clubName: 'Bournemouth' },
    { clubId: 4, clubName: 'Brentford' },
    { clubId: 5, clubName: 'Brighton' },
    { clubId: 6, clubName: 'Chelsea' },
    { clubId: 7, clubName: 'Crystal Palace' },
    { clubId: 8, clubName: 'Everton' },
    { clubId: 9, clubName: 'Fulham' },
    { clubId: 10, clubName: 'Ipswich Town' },
    { clubId: 11, clubName: 'Leicester City' },
    { clubId: 12, clubName: 'Liverpool' },
    { clubId: 13, clubName: 'Manchester City' },
    { clubId: 14, clubName: 'Manchester Utd' },
    { clubId: 15, clubName: 'Newcastle Utd' },
    { clubId: 16, clubName: 'Nottingham Forest' },
    { clubId: 17, clubName: 'Southampton' },
    { clubId: 18, clubName: 'Tottenham' },
    { clubId: 19, clubName: 'West Ham' },
    { clubId: 20, clubName: 'Wolverhampton' },
  ];

  playerPositions = [
    { positionId: 1, positionName: 'Goalkeeper' },
    { positionId: 2, positionName: 'Defender' },
    { positionId: 3, positionName: 'Midfielder' },
    { positionId: 4, positionName: 'Attacker' },
  ];

  players: Player[] = [];

  formations: { [key: string]: Formation } = {
    '4-4-2': {
      goalkeeper: this.emptyPlayerObject(1),
      defenders: [this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2)],
      midfielders: [this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3)],
      attackers: [this.emptyPlayerObject(4), this.emptyPlayerObject(4)],
    },
    '4-3-3': {
      goalkeeper: this.emptyPlayerObject(1),
      defenders: [this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2)],
      midfielders: [this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3)],
      attackers: [this.emptyPlayerObject(4), this.emptyPlayerObject(4), this.emptyPlayerObject(4)],
    },
    '3-4-3': {
      goalkeeper: this.emptyPlayerObject(1),
      defenders: [this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2)],
      midfielders: [this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3)],
      attackers: [this.emptyPlayerObject(4), this.emptyPlayerObject(4), this.emptyPlayerObject(4)],
    },
    '3-5-2': {
      goalkeeper: this.emptyPlayerObject(1),
      defenders: [this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2)],
      midfielders: [this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3)],
      attackers: [this.emptyPlayerObject(4), this.emptyPlayerObject(4)],
    },
    '5-3-2': {
      goalkeeper: this.emptyPlayerObject(1),
      defenders: [this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2)],
      midfielders: [this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3)],
      attackers: [this.emptyPlayerObject(4), this.emptyPlayerObject(4)],
    },
    '5-4-1': {
      goalkeeper: this.emptyPlayerObject(1),
      defenders: [this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2)],
      midfielders: [this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3)],
      attackers: [this.emptyPlayerObject(4)],
    },
    '4-5-1': {
      goalkeeper: this.emptyPlayerObject(1),
      defenders: [this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2), this.emptyPlayerObject(2)],
      midfielders: [this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3), this.emptyPlayerObject(3)],
      attackers: [this.emptyPlayerObject(4)],
    },
  };

  formationKeys = Object.keys(this.formations);
  selectedFormation: string = '4-4-2';
  formation = this.formations[this.selectedFormation];

  rosterLocked = false;
  userRoster = new MatTableDataSource<TeamPlayer>();
  userRosterAttackers = new Array<Player>();
  userRosterMidfielders = new Array<Player>();
  userRosterDefenders = new Array<Player>();
  userRosterGoalkeepers = new Array<Player>();

  constructor(private matDialog: MatDialog, private playerService: PlayerService, private teamService: TeamService) {
    this.teamService.teamPlayers$.subscribe(teamPlayer => {
      this.userRoster.data = teamPlayer;

      if (this.userRoster.data.length > 0) {
        this.setUserRoster();
      }
    })


    this.playerService.players$.subscribe(players => {
      this.players = players;
    })

    this.generatePlayers();

    this.setUserRoster();
  }

  emptyPlayerObject(positionId: number): Player {
    return { id: 0, firstName: "Click to", lastName: "choose", clubId: 0, clubName: "", positionId: positionId, positionName: this.getPositionName(positionId) }
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

  lockRoster() {
    this.rosterLocked = !this.rosterLocked;
  }

  generatePlayers() {
    let playerId = 0;
    this.premierLeagueClubs.forEach(club => {
      this.playerPositions.forEach(position => {
        for (let i = 1; i <= 5; i++) {
          this.players.push({
            id: playerId++,
            firstName: `FirstName${playerId}`,
            lastName: `LastName${playerId}`,
            clubId: club.clubId,
            clubName: club.clubName,
            positionId: position.positionId,
            positionName: position.positionName,
          });
        }
      });
    });
  }

  onFormationChange(event: MatSelectChange) {
    this.selectedFormation = event.value;
    this.formation = this.formations[this.selectedFormation];

    let tempRoster = new Array<TeamPlayer>();

    let goalkeeper = {
      id: this.formation.goalkeeper.id,
      firstName: this.formation.goalkeeper.firstName,
      lastName: this.formation.goalkeeper.lastName,
      captain: false,
      clubId: this.formation.goalkeeper.clubId,
      clubName: this.formation.goalkeeper.clubName,
      clubShorthand: "",
      positionId: this.formation.goalkeeper.positionId,
      positionName: this.formation.goalkeeper.positionName
    } as TeamPlayer;

    tempRoster.push(goalkeeper);

    this.formation.defenders.forEach(d => {
      let tempPlayer = {
        id: d.id,
        firstName: d.firstName,
        lastName: d.lastName,
        captain: false,
        clubId: d.clubId,
        clubName: d.clubName,
        clubShorthand: "",
        positionId: d.positionId,
        positionName: d.positionName
      } as TeamPlayer;

      tempRoster.push(tempPlayer);
    });

    this.formation.midfielders.forEach(m => {
      let tempPlayer = {
        id: m.id,
        firstName: m.firstName,
        lastName: m.lastName,
        captain: false,
        clubId: m.clubId,
        clubName: m.clubName,
        clubShorthand: "",
        positionId: m.positionId,
        positionName: m.positionName
      } as TeamPlayer;

      tempRoster.push(tempPlayer);
    });

    this.formation.attackers.forEach(a => {
      let tempPlayer = {
        id: a.id,
        firstName: a.firstName,
        lastName: a.lastName,
        captain: false,
        clubId: a.clubId,
        clubName: a.clubName,
        clubShorthand: "",
        positionId: a.positionId,
        positionName: a.positionName
      } as TeamPlayer;

      tempRoster.push(tempPlayer);
    });

    this.userRoster.data = tempRoster;
  }

  setUserRoster() {
    let tempRoster = new Array<TeamPlayer>();

    let goalkeeper = this.userRoster.data.filter(x => x.positionId == positions.Goalkeeper)

    // let goalkeeper = {
    //   id: this.formation.goalkeeper.id,
    //   firstName: this.formation.goalkeeper.firstName,
    //   lastName: this.formation.goalkeeper.lastName,
    //   captain: false,
    //   clubId: this.formation.goalkeeper.clubId,
    //   clubName: this.formation.goalkeeper.clubName,
    //   clubShorthand: "",
    //   positionId: this.formation.goalkeeper.positionId,
    //   positionName: this.formation.goalkeeper.positionName
    // } as TeamPlayer;

    // tempRoster.push(goalkeeper);

    this.formation.defenders.forEach(d => {
      let tempPlayer = {
        id: d.id,
        firstName: d.firstName,
        lastName: d.lastName,
        captain: false,
        clubId: d.clubId,
        clubName: d.clubName,
        clubShorthand: "",
        positionId: d.positionId,
        positionName: d.positionName
      } as TeamPlayer;

      tempRoster.push(tempPlayer);
    });

    this.formation.midfielders.forEach(m => {
      let tempPlayer = {
        id: m.id,
        firstName: m.firstName,
        lastName: m.lastName,
        captain: false,
        clubId: m.clubId,
        clubName: m.clubName,
        clubShorthand: "",
        positionId: m.positionId,
        positionName: m.positionName
      } as TeamPlayer;

      tempRoster.push(tempPlayer);
    });

    this.formation.attackers.forEach(a => {
      let tempPlayer = {
        id: a.id,
        firstName: a.firstName,
        lastName: a.lastName,
        captain: false,
        clubId: a.clubId,
        clubName: a.clubName,
        clubShorthand: "",
        positionId: a.positionId,
        positionName: a.positionName
      } as TeamPlayer;

      tempRoster.push(tempPlayer);
    });

    this.userRoster.data = tempRoster;
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

  openAssignPlayer(positionId: number, positionName: string, index: number) {
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
        switch (playerAssigned.positionId) {
          case 1:
            this.formation.goalkeeper = playerAssigned;
            break;
          case 2:
            this.formation.defenders[index] = playerAssigned;
            break;
          case 3:
            this.formation.midfielders[index] = playerAssigned;
            break;
          case 4:
            this.formation.attackers[index] = playerAssigned;
            break;
          default:
            break;
        }

        this.setUserRoster();
      }
    })
  }
}
