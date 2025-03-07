import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JoinTournament } from '../../interfaces/join-tournament';
import { TournamentService } from '../../services/tournament.service';

@Component({
  selector: 'app-join-tournament',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './join-tournament.component.html',
  styleUrl: './join-tournament.component.css'
})
export class JoinTournamentComponent {
  tournamentForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: number, private tournamentService: TournamentService,
    private fb: FormBuilder, private matDialogRef: MatDialogRef<JoinTournamentComponent>) {
    this.tournamentForm = this.fb.group({
      inviteCode: ['', Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      teamName: ['', Validators.required, Validators.minLength(3), Validators.maxLength(50)]
    });
  }

  onSubmit() {
    let tournament = {
      inviteCode: this.tournamentForm.get("name")?.value,
      teamName: this.tournamentForm.get("teamName")?.value,
      userId: this.data,
    } as JoinTournament;

    this.tournamentService.joinTournament(tournament);

    this.matDialogRef.close(true);
  }
}
