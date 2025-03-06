import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Competition } from '../../interfaces/competition';
import { CompetitionService } from '../../services/competition.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})
export class CompetitionsComponent {
  loggedIn$ = this.authService.loggedIn$;

  competitions = new Array<Competition>();

  constructor(private authService: AuthenticationService, private competitionService: CompetitionService) {
    this.competitionService.getCompetitionList();

    // let test = {
    //   id: 0,
    //   name: "Premier league",
    //   startDate: "01/01/2024",
    //   endDate: "01/06/2024",
    // } as Competition;

    // this.competitions.push(test);

    this.competitionService.competitions$.subscribe(comp => {
      this.competitions = comp;
    })
  }

}
