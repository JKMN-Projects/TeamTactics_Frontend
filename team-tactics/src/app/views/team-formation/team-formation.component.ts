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
    { clubId: 1, clubName: 'Arsenal', clubShorthand: 'ARS' },
    { clubId: 2, clubName: 'Aston Villa', clubShorthand: 'AVL' },
    { clubId: 3, clubName: 'Bournemouth', clubShorthand: 'BOU' },
    { clubId: 4, clubName: 'Brentford', clubShorthand: 'BRE' },
    { clubId: 5, clubName: 'Brighton', clubShorthand: 'BRI' },
    { clubId: 6, clubName: 'Chelsea', clubShorthand: 'CHE' },
    { clubId: 7, clubName: 'Crystal Palace', clubShorthand: 'CRP' },
    { clubId: 8, clubName: 'Everton', clubShorthand: 'EVE' },
    { clubId: 9, clubName: 'Fulham', clubShorthand: 'FUL' },
    { clubId: 10, clubName: 'Ipswich Town', clubShorthand: 'IPS' },
    { clubId: 11, clubName: 'Leicester City', clubShorthand: 'LEI' },
    { clubId: 12, clubName: 'Liverpool', clubShorthand: 'LIV' },
    { clubId: 13, clubName: 'Manchester City	', clubShorthand: 'MAN' },
    { clubId: 14, clubName: 'Manchester Utd', clubShorthand: 'MUN' },
    { clubId: 15, clubName: 'Newcastle Utd', clubShorthand: 'NEU' },
    { clubId: 16, clubName: 'Nottingham Forest', clubShorthand: 'NOF' },
    { clubId: 17, clubName: 'Southampton', clubShorthand: 'SOU' },
    { clubId: 18, clubName: 'Tottenham', clubShorthand: 'TOT' },
    { clubId: 19, clubName: 'West Ham', clubShorthand: 'WHA' },
    { clubId: 20, clubName: 'Wolverhampton', clubShorthand: 'WOL' },
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
  userRoster = new MatTableDataSource<Player>();
  userRosterAttackers = new Array<Player>();
  userRosterMidfielders = new Array<Player>();
  userRosterDefenders = new Array<Player>();
  userRosterGoalkeepers = new Array<Player>();

  constructor(private matDialog: MatDialog) {
    this.generatePlayers();

    this.setUserRoster();
  }

  emptyPlayerObject(positionId: number): Player {
    return { id: 0, firstName: "Click to", lastName: "choose", captain: false, clubId: 0, clubName: "", clubShorthand: "player", positionId: positionId, positionName: this.getPositionName(positionId) }
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
            captain: false,
            clubId: club.clubId,
            clubName: club.clubName,
            clubShorthand: club.clubShorthand,
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

    let tempRoster = new Array<Player>();
    tempRoster.push(this.formation.goalkeeper);

    this.formation.defenders.forEach(d => {
      tempRoster.push(d);
    });

    this.formation.midfielders.forEach(m => {
      tempRoster.push(m);
    });

    this.formation.attackers.forEach(a => {
      tempRoster.push(a);
    });

    this.userRoster.data = tempRoster;
  }

  setUserRoster() {
    let tempRoster = new Array<Player>();
    tempRoster.push(this.formation.goalkeeper);

    this.formation.defenders.forEach(d => {
      tempRoster.push(d);
    });

    this.formation.midfielders.forEach(m => {
      tempRoster.push(m);
    });

    this.formation.attackers.forEach(a => {
      tempRoster.push(a);
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
